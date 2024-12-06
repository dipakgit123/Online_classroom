import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addExamToState, deleteExamFromState, setExams, updateExamInState } from '../Store/batches';
import { addOrUpdateExam, deleteExam, fetchExams2 } from '../services/batchesapi';
// import Dashboard from './Dashboard';

// Ensure to bind the modal to your app
Modal.setAppElement('#root');

const Batches = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.batch);

  // States for form fields and other controls
  const [showModal, setShowModal] = useState(false);
  const [examCode, setExamCode] = useState('');
  const [examTitlee, setExamTitlee] = useState('');
  const [examDate, setExamDate] = useState('');
  const [addmision,setAddmision] = useState('');



  const [publishedAt, setPublishedAt] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [editingExamId, setEditingExamId] = useState(null);
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedExamId, setSelectedExamId] = useState('');

  // Fetch exams from API when component mounts
  useEffect(() => {
    fetchExams2()
      .then((data) => {
        console.log('Batch fetched:', data);
        dispatch(setExams(data));
      })
      .catch((error) => console.error('Error fetching Batch:', error));
  }, [dispatch]);

  const handleAddOrUpdateExam = async (e) => {
    // e.preventDefault();
    const newExam = {
      code: examCode,
      addmision:addmision,
      title: examTitlee,
    
      date: examDate,
  
      
      isPublished,
      publishedAt,
      addedOn: new Date().toISOString(),
      addedBy: addedBy || 'Admin',
    };

    try {
      const savedExam = await addOrUpdateExam(newExam, editingExamId);
      if (editingExamId) {
        dispatch(updateExamInState(savedExam));
      } else {
        dispatch(addExamToState(savedExam));
      }
      setShowModal(false);
      resetFormFields();
    } catch (error) {
      console.error('Error adding/updating Batch:', error);
      alert(`An error occurred while saving the Batch. ${error.message}`);
    }
  };

  const handleDeleteExam = (examId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Batch?');
    if (confirmDelete) {
      deleteExam(examId)
        .then(() => {
          dispatch(deleteExamFromState(examId));
        })
        .catch((error) => {
          console.error('Error deleting Batch:', error);
          alert(`An error occurred while deleting the Batch. ${error.message}`);
        });
    }
  };

  const resetFormFields = () => {
    setExamCode('');
    setAddmision('');
    setExamTitlee('');
    setExamDate('');
    setPublishedAt('');
    setAddedBy('');
    setIsPublished(false);
    setEditingExamId(null);
  };


  const openEditModal = (exam) => {
    setExamCode(exam.code);
    setAddmision(exam.addmision);
    setExamTitlee(exam.title);
  
    setExamDate(exam.date);
    setPublishedAt(exam.publishedAt);
    setAddedBy(exam.addedBy);
    setIsPublished(exam.isPublished);
    setEditingExamId(exam.id);
    setShowModal(true);
  };



  const handleCloseModal = () => {
    setShowModal(false);
    resetFormFields();
  };

  const filteredExams = list.filter((exam) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      exam.code.toLowerCase().includes(searchTermLower) ||    // Check exam code
      exam.title.toLowerCase().includes(searchTermLower) ||   // Check exam title// Check added by
      exam.date.toLowerCase().includes(searchTermLower) ||
      exam.addmision.toLowerCase().includes(searchTermLower)
     
    );
  });

  const indexOfLastExam = page * entriesToShow;
  const indexOfFirstExam = indexOfLastExam - entriesToShow;
  const currentExams = filteredExams.slice(indexOfFirstExam, indexOfLastExam);

  const selectedExam = list.find((exam) => exam.id === selectedExamId);







  // Errrorss Handling 
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission
  const [errorMessage, setErrorMessage] = useState(""); // Store error message
  
  const handleFormSubmit = () => {
    setFormSubmitted(true); // Mark the form as submitted
  
  
    const isTrainerNameValid = examTitlee.trim() !== "" && !/\d/.test(examTitlee);
  
  
    // Validate all fields
    const isFormValid =
      examCode &&
      /[A-Z]/.test(examCode) &&
      /\d/.test(examCode) &&
      addmision &&
      examTitlee.trim() &&
      examDate.trim() &&
      addedBy.trim();
  
    if (isFormValid) {
      setErrorMessage(""); // Clear any existing error messages
      handleAddOrUpdateExam(); // Call the actual submission logic
      alert(editingExamId ? "Batch Updated Successfully" : "New Batch Added"); // Success alert
      setFormSubmitted(false); // Reset form submission state
    } else {
      setErrorMessage("Please enter valid details in all fields."); // Set error message
    }
  };
  
  return (
    <>
    {/* <Dashboard/> */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1 style={{ fontSize: '36px', color: '#333' }}>
        <i class="fa-solid fa-book-open" style={{ marginRight: '10px' }}></i>
        
         Batches
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
            width: '80%',
            margin: '0 auto',
          }}
        >
         Here, you can either add a new batch or edit existing batches.
        </div>

        <div
          style={{
            maxWidth: '80%',
            margin: '0 auto',
            borderRadius: '4px',
            border: '2px solid black',
            padding: '15px',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#F6F6F6',
              padding: '15px',
              fontSize: '18px',
              textAlign: 'left',
              borderRadius: '4px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <strong>Manage Batches</strong>
       

            <button
              style={{
                backgroundColor: '#097799',
                color: '#fff',
                padding: '10px 20px',
                border: '1px solid white',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.3s ease', // Smooth transition for hover and movement
                transform: 'translateY(-5px)', // Moves the button 5px up
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#065a6b'; // Change color on hover
                e.currentTarget.style.transform = 'translateY(-10px)'; // Move the button a bit more up on hover
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#097799'; // Revert color on mouse out
                e.currentTarget.style.transform = 'translateY(-5px)'; // Reset button to original position
              }}
              onClick={() => setShowModal(true)}
            >
              + Add New Batches
            </button>


          </div>

          {/* Search, entries dropdown */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ marginRight: '10px', fontSize: '16px', color: '#333' }}>Entries to show:</span>
                  <select
                    value={entriesToShow}
                    onChange={(e) => setEntriesToShow(Number(e.target.value))}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                      backgroundColor: '#f9f9f9',
                      fontSize: '16px',
                      color: '#333',
                      outline: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                      transition: 'border-color 0.3s ease', // Smooth transition for interactions
                      appearance: 'none', // Hides the default arrow for custom styling
                      WebkitAppearance: 'none', // Hides the default arrow for Safari
                    }}
                    onMouseOver={(e) => (e.target.style.borderColor = '#007bff')}
                    onMouseOut={(e) => (e.target.style.borderColor = '#ccc')}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15} >15</option>
                    <option value={20} >20</option>
                  </select>
                </div>


            <div>
              Search:
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '5px',
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
                  <th style={{ border: '1px solid black', padding: 8 }}>Batch Id</th>
                  <th style={{ border: '1px solid black', padding: 8 }}>Course</th>
                  <th style={{ border: '1px solid black', padding: 8 }}>Batch Name</th>
               
                  <th style={{ border: '1px solid black', padding: 8 }}>Is Active</th>
                  {/* <th style={{ border: '1px solid black', padding: 8 }}>Published At</th> */}
                  <th style={{ border: '1px solid black', padding: 8 }}>Date</th>
                  <th style={{ border: '1px solid black', padding: 8 }}>Actions</th>

                  
                </tr>
              </thead>
              <tbody>
                {currentExams.map((exam) => (
                  <tr key={exam.id}>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.code}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.addmision}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.title}</td>
                  
                    <td style={{ border: '1px solid black', padding: 8 }}>
                      {exam.isPublished ? 'Yes' : 'No'}
                    </td>
                    {/* <td style={{ border: '1px solid black', padding: 8 }}>{exam.publishedAt}</td> */}
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.date}</td>
                   
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
    sx={{
      '& .MuiPaginationItem-root': {
        color: '#333', // Default text color
        margin: '0 4px', // Space between pagination items
        padding: '6px 12px', // Simple padding
        borderRadius: '4px', // Slight rounding for a button look
      },
      '& .MuiPaginationItem-root:hover': {
        backgroundColor: '#f257da', // Background on hover
      },
      '& .MuiPaginationItem-root.Mui-selected': {
        backgroundColor: '#f005cc', // Background color for selected item
        color: '#fff', // White text for selected item
      },
    }}
  />
</div>
        </div>
        



        </div>

        <Modal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="Add/Edit Batch"
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
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '24px' }}>
        {editingExamId ? 'Edit Batch' : 'Add New Batch'}
      </h2>
      <form
    onSubmit={(e) => {
      e.preventDefault(); // Prevent default form submission
      handleFormSubmit();
       // Handle submission+
    }}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      fontSize: "16px",
    }}
  >
    {/* Exam Code Input */}
    <div style={{ display: "flex", flexDirection: "column" }}>
  <label style={{ marginBottom: "5px", color: "#333" }}>Batch Code:</label>
  <input
    type="text"
    value={examCode}
    onChange={(e) => setExamCode(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    }}
  />
  {formSubmitted && examCode.trim() === "" && (
    <span style={{ color: "red" }}>Batch Code is required.</span>
  )}
  {formSubmitted && examCode.trim() !== "" && (!/[A-Z]/.test(examCode) || !/\d/.test(examCode)) && (
    <span style={{ color: "red" }}>
      Batch Code must contain at least one capital letter and one number.
    </span>
  )}

{examCode && !/[A-Z]/.test(examCode) && (
        <span style={{ color: 'red' }}>Exam Code must contain at least one capital letter.</span>
      )}
      {examCode && !/\d/.test(examCode) && (
        <span style={{ color: 'red' }}>Exam Code must contain at least one number.</span>
      )}
</div>


    {/* Admission For */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ marginBottom: "5px", color: "#333" }}>Courses:</label>
      <select
        value={addmision}
        onChange={(e) => setAddmision(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">------Select Course------</option>
        <option >(Xyz)(Fees:0.00)</option>
        <option >(DBMS)(Fees:6000.00)</option>
        <option >(Defensive Driving Training)(Fees:8000.00)</option>
        <option >(java)(Fees:2000.00)</option>
        <option >(PGDCA)(Fees:7000.00)</option>
        <option >(RSM)(Fees:0.00)</option>
        <option >(test)(Fees:0.00)</option>
      </select>
      {formSubmitted && addmision === "" && (
        <span style={{ color: "red" }}>Please select a course.</span>
      )}


    </div>

{/* Batch name  */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
  <label style={{ marginBottom: '5px', color: '#333' }}>Batch Name:</label>
  <input
    type="text"
    value={examTitlee}
    onChange={(e) => {
      const value = e.target.value;
      // Prevent numbers from being entered
      if (!/\d/.test(value)) {
        setExamTitlee(value);
      }
    }}
    required
    style={{
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    }}
  />
  {formSubmitted && examTitlee.trim() === "" && (
    <span style={{ color: 'red' }}>Batch Name is required.</span>
  )}
  {formSubmitted && /\d/.test(examTitlee) && (
    <span style={{ color: 'red' }}>Batch Name must not contain numbers.</span>
  )}

</div>



        {/* Exam Date */}
        <div style={{ display: "flex", flexDirection: "column" }}>
  <label style={{ marginBottom: "5px", color: "#333" }}>Date:</label>
  <input
    type="date"
    value={examDate}
    onChange={(e) => setExamDate(e.target.value)}
    min={new Date().toISOString().split("T")[0]} // Today's date in YYYY-MM-DD format
    style={{
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    }}
  />
  {formSubmitted && examDate.trim() === "" && (
    <span style={{ color: "red" }}>Please select a valid date.</span>
  )}
</div>



           {/* Is Active Checkbox */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <label style={{ color: '#333' }}>Is Active:</label>
      <input
        type="checkbox"
        checked={isPublished}
        onChange={(e) => setIsPublished(e.target.checked)}
      />
    </div>

        {/* Added By */}
<div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ marginBottom: "5px", color: "#333" }}>Added By:</label>
      <select
        value={addedBy}
        onChange={(e) => setAddedBy(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">------Select here------</option>
        <option value="SuperAdmin">Super Admin</option>
        <option value="Admin">Admin</option>
      </select>
      {formSubmitted && addmision === "" && (
        <span style={{ color: "red" }}>Please select a Field.</span>
      )}


    </div>

    {/* Form Buttons */}
    <div style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
      <button
        type="submit"
        style={{
          backgroundColor:
            examCode &&
            /[A-Z]/.test(examCode) &&
            /\d/.test(examCode) &&
            addmision &&
            examTitlee.trim() &&
            examDate.trim() &&
            addedBy.trim()
              ? "gray"
              : "#d3d3d3", // Light gray if invalid
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          marginRight: "30px",
          padding: "10px 20px",
          cursor:
            examCode &&
            /[A-Z]/.test(examCode) &&
            /\d/.test(examCode) &&
            addmision &&
            examTitlee.trim() &&
            examDate.trim() &&
            addedBy.trim()
              ? "pointer"
              : "not-allowed", // Pointer if valid, not-allowed if invalid
        }}
        disabled={
          !(
            examCode &&
            /[A-Z]/.test(examCode) &&
            /\d/.test(examCode) &&
            addmision &&
            examTitlee.trim() &&
            examDate.trim() &&
            addedBy.trim()
          )
        }
      >
        {editingExamId ? "Update Batches" : "Add Batches"}
      </button>
      <button
        type="button"
        onClick={handleCloseModal}
        style={{
          backgroundColor: "Black",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
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

export default Batches;