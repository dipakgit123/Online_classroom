import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addExamToState, deleteExamFromState, setExams, updateExamInState } from '../Store/examSlice';
import { addOrUpdateExam, deleteExam, fetchExams } from '../services/api';

// Ensure to bind the modal to your app
Modal.setAppElement('#root');

const ExamResult = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.exams);
  console.log(list);


  // States for form fields and other controls
  const [showModal, setShowModal] = useState(false);
  const [examCode, setExamCode] = useState('');
  const [examTitle, setExamTitle] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examMarks, setExamMarks] = useState([{ subject: '', maxMarks: '' }]);
  const [publishedAt, setPublishedAt] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [editingExamId, setEditingExamId] = useState(null);
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const validateExamTitle = (title) => {
    return /^[A-Z]/.test(title);
  };

  const handleBlur = () => {
    if (!examDate) {
      document.getElementById('error').textContent = 'Exam Date is required.';
    } else {
      document.getElementById('error').textContent = ''; // Clear the error message
    }
  };

  const isFormValid = () => {
    return examTitle.trim() !== "" && examDate.trim() !== "";
  };

  const handleMarksBlur = () => {
    if (!examMarks.subject) {
      document.getElementById('subject-error').textContent = 'Subject is required.';
    } else {
      document.getElementById('subject-error').textContent = ''; // Clear the error message
    }
  
    if (!examMarks.maxMarks || examMarks.maxMarks <= 0) {
      document.getElementById('max-marks-error').textContent = 'Max Marks must be a positive number.';
    } else {
      document.getElementById('max-marks-error').textContent = ''; // Clear the error message
    }
  };
  
  const isMarksValid = () => {
    return (
      examMarks?.subject?.trim() !== "" &&
      examMarks?.maxMarks > 0
    );
  };


  // Fetch exams from API when component mounts
  useEffect(() => {
    fetchExams()
      .then((data) => {
        console.log('Exams fetched:', data);
        dispatch(setExams(data));
      })
      .catch((error) => console.error('Error fetching exams:', error));
  }, [dispatch]);

  const handleAddOrUpdateExam = async (e) => {
    e.preventDefault()
    const newExam = {
      code: examCode,
      title: examTitle,
      date: examDate,
      marks: examMarks,
      isPublished,
      publishedAt,
      addedOn: new Date().toISOString(),
      addedBy: addedBy || 'Admin',
    };

    try {
   


      const savedExam = await addOrUpdateExam(newExam, editingExamId);
      if (editingExamId) {
        dispatch(updateExamInState(savedExam));
        console.log(savedExam);
      } else {
        dispatch(addExamToState(savedExam));
        console.log(savedExam);
      }
      setShowModal(false);
      resetFormFields();
    } catch (error) {
      console.error('Error adding/updating exam:', error);
      alert(`An error occurred while saving the exam. ${error.message}`);
    }
  };

  const handleDeleteExam = (examId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this exam?');
    if (confirmDelete) {
      deleteExam(examId)
        .then(() => {
          dispatch(deleteExamFromState(examId));
        })
        .catch((error) => {
          console.error('Error deleting exam:', error);
          alert(`An error occurred while deleting the exam. ${error.message}`);
        });
    }
  };

  const resetFormFields = () => {
    setExamCode('');
    setExamTitle('');
    setExamDate('');
    setExamMarks([{ subject: '', maxMarks: '' }]);
    setPublishedAt('');
    setAddedBy('');
    setIsPublished(false);
    setEditingExamId(null);
  };

  const openEditModal = (exams) => {
    setExamCode(exams.code);
    setExamTitle(exams.title);
    setExamDate(exams.date);
    setExamMarks(exams.marks);
    setPublishedAt(exams.publishedAt);
    setAddedBy(exams.addedBy);
    setIsPublished(exams.isPublished);
    setEditingExamId(exams.id);
    setShowModal(true);
  };

  const handleMarksChange = (field, value) => {
    setExamMarks((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };


  const handleCloseModal = () => {
    setShowModal(false);
    resetFormFields();
  };

  const filteredExams = list.filter((exam) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      exam.code.toLowerCase().includes(searchTermLower) ||    // Check exam code
      exam.title.toLowerCase().includes(searchTermLower) ||   // Check exam title
      exam.addedBy.toLowerCase().includes(searchTermLower) || // Check added by
      exam.date.toLowerCase().includes(searchTermLower) 
    );
  });
  

  const indexOfLastExam = page * entriesToShow;
  const indexOfFirstExam = indexOfLastExam - entriesToShow;
  const currentExams = filteredExams.slice(indexOfFirstExam, indexOfLastExam);

  const selectedExam = list.find((exam) => exam.id === selectedExamId);
 

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1 style={{ fontSize: '36px', color: '#333' }}>
          <i className="fa fa-chart-bar" style={{ marginRight: '10px' }}></i>
          Exam Results
        </h1>

        <div
          style={{
            backgroundColor: '#d4edda',
            borderColor: '#c3e6cb',
            color: '#155724',
            padding: '15px',
            fontSize: '16px',
            borderRadius: '4px',
            marginBottom: '20px',
            width: '90%',
            margin: '0 auto',
          }}
        >
          Here, you can add and publish exam results.
        </div>

        <div
          style={{
            maxWidth: '90%',
            margin: '0 auto',
            borderRadius: '4px',
            border: '2px solid black',
            padding: '15px',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '15px',
              fontSize: '18px',
              textAlign: 'left',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #0056b3',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <strong>Manage Exams and Results</strong>
            <button
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '10px 20px',
                border: '1px solid white',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              onClick={() => setShowModal(true)}
            >
              + Add New Exam
            </button>
          </div>

          {/* Search, entries dropdown */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>Entries to show:</span>
              <select
                value={entriesToShow}
                onChange={(e) => setEntriesToShow(Number(e.target.value))}
                style={{ padding: '10px' }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div>
              Search:
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px',
                  width: '70%',
                  display: 'inline-block',
                  marginLeft: '0.5em',
                  borderRadius: '2px',
                }}
              />
            </div>
          </div>

          {/* Table of exams */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <table
              style={{
                borderCollapse: 'collapse',
                margin: '0 auto',
                width: '100%',
                border: '1px solid #ccc',
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: 8 }}>Exam Code</th>
                  <th style={{ border: '1px solid black', padding: 8 }}>Exam Title</th>
                  <th style={{ border: '1px solid black', padding: 8 }}>Exam Date</th>
                  <th style={{ border: '1px solid black', padding: 8 }}>Is Published</th>
                  <th style={{ border: '1px solid black', padding: 8 }}>Published At</th>
                  <th style={{ border: '1px solid black', padding: 8 }}>Added By</th>
                  <th style={{ border: '1px solid black', padding: 8 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentExams.map((exam) => (
                  <tr key={exam.id}>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.code}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.title}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.date}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>
                      {exam.isPublished ? 'Yes' : 'No'}
                    </td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.publishedAt}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.addedBy}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }}
                        onClick={() => openEditModal(exam)}
                      />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{ cursor: 'pointer', color: 'red' }}
                        onClick={() => handleDeleteExam(exam.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         

          {/* Pagination */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Pagination
              count={Math.ceil(filteredExams.length / entriesToShow)}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              color="primary"
            />
          </div>
        </div>

      {/* View Exam Results Section */}
<div style={{ marginTop: "40px", textAlign: "center" }}>
  <h2 style={{ fontSize: "28px", color: "blue", textAlign: "left" }}>
    View Exam Marks:
  </h2>
  <div style={{ marginBottom: "20px" }}>
    <label htmlFor="selectExam" style={{ marginRight: "10px" }}>
      Select Exam:
    </label>
    <select
      id="selectExam"
      value={selectedExamId}
      onChange={(e) => setSelectedExamId(e.target.value)}
      style={{ padding: "10px", borderRadius: "4px" }}
    >
      <option value="">-- Select Exam --</option>
      {list.map((exam) => (
        <option key={exam.id} value={exam.id}>
          {exam.title} - {exam.date}
        </option>
      ))}
    </select>
  </div>

  {/* Display selected exam's results in a table */}
  {selectedExam && (
    <div
      style={{
        marginTop: "20px",
        textAlign: "left",
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      <h3 style={{ fontSize: "24px", color: "#007bff" }}>
        Exam: {selectedExam.title}
      </h3>
      <table
        style={{
          borderCollapse: "collapse",
          margin: "0 auto",
          width: "100%",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: 8 }}>Exam Code</th>
            <th style={{ border: "1px solid black", padding: 8 }}>Subject</th>
            <th style={{ border: "1px solid black", padding: 8 }}>Max Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: 8 }}>
              {selectedExam.code}
            </td>
            <td style={{ border: "1px solid black", padding: 8 }}>
              {selectedExam.marks.subject}
            </td>
            <td style={{ border: "1px solid black", padding: 8 }}>
              {selectedExam.marks.maxMarks}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )}
</div>;
</div> 

        <Modal
  isOpen={showModal}
  onRequestClose={handleCloseModal}
  contentLabel="Add/Edit Exam"
  style={{
    content: {
      width: '50%',
      height: 'auto',
      margin: '0 auto',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: 'none',
      backgroundColor: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  }}
>
  {/* Close Button */}
  <button
    onClick={handleCloseModal}
    style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
    }}
  >
    &times;
  </button>

  <h2 style={{ textAlign: 'center', color: '#333', fontSize: '24px' }}>
    {editingExamId ? 'Edit Exam' : 'Add New Exam'}
  </h2>

  <form
    onSubmit={handleAddOrUpdateExam}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      fontSize: '16px',
    }}
  >
    {/* Exam Code Input with Validation */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ marginBottom: '5px', color: '#333' }}>Exam Code:</label>
      <input
        type="text"
        value={examCode}
        onChange={(e) => setExamCode(e.target.value)}
        required
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      {examCode && !/[A-Z]/.test(examCode) && (
        <span style={{ color: 'red' }}>Exam Code must contain at least one capital letter.</span>
      )}
      {examCode && !/\d/.test(examCode) && (
        <span style={{ color: 'red' }}>Exam Code must contain at least one number.</span>
      )}
    </div>

    {/* Exam Title Input (Compulsory) */}
<div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ marginBottom: "5px", color: "#333" }}>Exam Title:</label>
      <input
        type="text"
        value={examTitle}
        onChange={(e) => setExamTitle(e.target.value)}
        onBlur={() => setIsTouched(true)} // Set touched when the input loses focus
        required
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      {isTouched && (!examTitle || !validateExamTitle(examTitle)) && (
        <span style={{ color: "red" }}>
          {examTitle
            ? "Exam Title must start with a capital letter."
            : "Exam Title is required."}
        </span>
      )}
    </div>

    {/* Exam Date Input (Compulsory) */}
<div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ marginBottom: '5px', color: '#333' }}>Exam Date:</label>
      <input
        type="date"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
        onBlur={handleBlur}  // Trigger validation when the field loses focus
        required
        min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <span id="error" style={{ color: 'red' }}></span>
    </div>


    {/* Marks Handling */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
  <label style={{ marginBottom: '5px', color: '#333' }}>Marks:</label>
  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
    <input
      type="text"
      placeholder="Subject"
      value={examMarks.subject || ""}
      onChange={(e) => handleMarksChange('subject', e.target.value)}
      onBlur={handleMarksBlur}
      style={{
        padding: '10px',
        flex: 1,
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    />
    <span id='subject-error' style={{color:'red',fontSize:'12px'}}></span>
    <input
      type="number"
      placeholder="Max Marks"
      value={examMarks.maxMarks}
      onChange={(e) => handleMarksChange('maxMarks', e.target.value)}
      onBlur={handleMarksBlur}
      style={{
        padding: '10px',
        flex: 1,
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    />
    <span id='max-marks-error' style={{color:'red',fontSize:'12px'}}></span>
  </div>
</div>


    {/* Is Published Checkbox */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <label style={{ color: '#333' }}>Is Published:</label>
      <input
        type="checkbox"
        checked={isPublished}
        onChange={(e) => setIsPublished(e.target.checked)}
      />
    </div>

    {/* Published At Date/Time */}
    {isPublished && (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px', color: '#333' }}>Published At:</label>
        <input
          type="date"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    )}

    {/* Added By Input */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ marginBottom: '5px', color: '#333' }}>Added By:</label>
      <input
        type="text"
        value={addedBy}
        onChange={(e) => setAddedBy(e.target.value)}
        required
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
    </div>

    {/* Form Buttons */}
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <button
        type="submit"
        disabled={!isFormValid() || !isMarksValid()}
        style={{
          backgroundColor: isFormValid()  ? "#2ecc71" : "#95a5a6",
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: isFormValid() ?  'pointer':"not-allowed",
        }}
      >
        {editingExamId ? 'Update Exam' : 'Add Exam'}
      </button>
      <button
        type="button"
        onClick={handleCloseModal}
        style={{
          backgroundColor: '#e74c3c',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer',
        }}
      >
        Cancel
      </button>
    </div>
  </form>
</Modal>
      </div>
    </>
  );
};

export default ExamResult;