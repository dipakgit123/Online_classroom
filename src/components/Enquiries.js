import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addExamToState, deleteExamFromState, setExams, updateExamInState } from '../Store/enquiry';
import { addOrUpdateExam, deleteExam, fetchExams } from '../services/apii';

// import Dashboard from './Dashboard';

// Ensure to bind the modal to your app
Modal.setAppElement('#root');

const Enquiries = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.enquiry);

  // States for form fields and other controls
  const [showModal, setShowModal] = useState(false);
  const [examCode, setExamCode] = useState('');
  const [examTitle, setExamTitle] = useState('');
  const [last, setLast] = useState('');
  const [phone, setphone] = useState('');
  const [email,setEmail] = useState('');
  const [address,setAddress] = useState('');
  const [examDate, setExamDate] = useState('');
  const [addmision,setAddmision] = useState('');
  const [gender,setGender] = useState('');
  const [city,setCity] = useState('');
  const  [state,setState] = useState('');
  const [examMarks, setExamMarks] = useState([{ subject: '', maxMarks: '' }]);
  const [publishedAt, setPublishedAt] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [editingExamId, setEditingExamId] = useState(null);
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [stateTouched, setStateTouched] = useState(false);
  const [lastTouched, setLastTouched] = useState(false);
  const [error, setError] = useState("");
  const [examTitleTouched, setExamTitleTouched] = useState(false);
  const [examTitleError, setExamTitleError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");


  // Fetch exams from API when component mounts
  useEffect(() => {
    fetchExams()
      .then((data) => {
        console.log('Enquiry fetched:', data);
        dispatch(setExams(data));
      })
      .catch((error) => console.error('Error fetching Enquiry:', error));
  }, [dispatch]);

  const handleAddOrUpdateExam = async () => {
    const newExam = {
      code: examCode,
      addmision:addmision,
      title: examTitle,
      last:last,
      phone: phone,
      email: email,
      address:address,
      city:city,
      state:state,
      date: examDate,
      gender:gender,
      
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
      console.error('Error adding/updating Enquiry:', error);
      alert(`An error occurred while saving the Enquiry. ${error.message}`);
    }
  };

  const handleDeleteExam = (examId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Enquiry?');
    if (confirmDelete) {
      deleteExam(examId)
        .then(() => {
          dispatch(deleteExamFromState(examId));
        })
        .catch((error) => {
          console.error('Error deleting Enquiry:', error);
          alert(`An error occurred while deleting the Enquiry. ${error.message}`);
        });
    }
  };

  const resetFormFields = () => {
    setExamCode('');
    setAddmision('');
    setExamTitle('');
    setLast('');
    setphone('');
    setEmail('');
    setAddress('');
    setCity('');
    setState('');
    setExamDate('');
    setGender('');
    setPublishedAt('');
    setAddedBy('');
    setIsPublished(false);
    setEditingExamId(null);
  };


  const openEditModal = (exam) => {
    setExamCode(exam.code);
    setAddmision(exam.addmision);
    setExamTitle(exam.title);
    setLast(exam.last)
    setphone(exam.phone);
    setEmail(exam.email);
    setAddress(exam.address);
    setCity(exam.city);
    setState(exam.state);
    setExamDate(exam.date);
    setGender(exam.gender);
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
      exam.title.toLowerCase().includes(searchTermLower) ||   // Check exam title
      exam.last.toLowerCase().includes(searchTermLower) || // Check added by
      exam.date.toLowerCase().includes(searchTermLower) ||
      exam.email.toLowerCase().includes(searchTermLower)||
      exam.phone.toLowerCase().includes(searchTermLower)||
      exam.addmision.toLowerCase().includes(searchTermLower)
    );
  });

  const indexOfLastExam = page * entriesToShow;
  const indexOfFirstExam = indexOfLastExam - entriesToShow;
  const currentExams = filteredExams.slice(indexOfFirstExam, indexOfLastExam);

  const selectedExam = list.find((exam) => exam.id === selectedExamId);







  // Errrorss Handling 
const isValidExamCode = /[A-Z]/.test(examCode) && /\d/.test(examCode);
  const isValidPhone = /^\d+$/.test(phone) && phone.length >= 10;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const specialCharPattern = /[^a-zA-Z\s]/;

  const isFormValid =
    isValidExamCode &&
    addmision &&
    examTitle &&
    last &&
    examDate &&
    gender &&
    isValidPhone &&
    isValidEmail &&
    address &&
    city &&
    state &&
    addedBy;



    // For first name 
    const handleExamTitleChange = (e) => {
      const value = e.target.value;
      let error = ""; 
      
      // Check for spaces in the input
      if (/\s/.test(value)) {
        error = "Spaces are not allowed in First Name.";
      }
    

      if (specialCharPattern.test(value)) {
        error = ("Special characters are not allowed.");
      } 


       // Prevent numbers from being entered
       if (/\d/.test(value)) {
        error = "Numbers are not allowed in First Name.";
      }

      if (error) {
        setExamTitleError(error);
      } else {
        setExamTitleError(""); // Clear the error if input is valid
        setExamTitle(value); // Set the input value if no error
      }
      
    };


    // for last name 
    const handleLastNameChange = (e) => {
      const value = e.target.value;
      let error = "";
    
      // Check for spaces in the input
      if (/\s/.test(value)) {
        error = "Spaces are not allowed in Last Name.";
      }
    
      if (specialCharPattern.test(value)) {
        error = ("Special characters are not allowed.");
      }
  
      // Prevent numbers from being entered
      if (/\d/.test(value)) {
        error = "Numbers are not allowed in Last Name.";
      }
     

      if (error) {
        setError(error);
      } else {
        setError(""); // Clear the error if input is valid
        setLast(value); // Set the input value if no error
      }


   
    
    };
    
    //City
    const handleCityChange = (e) => {
      const value = e.target.value;
      let error = "";
  
    
      // Check for spaces in the input
      if (/\s/.test(value)) {
        error = "Spaces are not allowed in City.";
      }

      if (specialCharPattern.test(value)) {
        error =("Special characters are not allowed.");
      }

        // Prevent numbers from being entered
        if (/\d/.test(value)) {
          error = "Numbers are not allowed in City.";
        }
    
  
      if (error) {
        setCityError(error);
      } else {
        setCityError(""); // Clear the error if input is valid
        setCity(value); // Set the input value if no error
      }

     
    };



  //State
  const handleStateChange = (e) => {
    const value = e.target.value;
    let error = "";

    // Check for spaces in the input
    if (/\s/.test(value)) {
      error = "Spaces are not allowed in State.";
    }

    if (specialCharPattern.test(value)) {
      error =("Special characters are not allowed.");
    } 
 
    // Prevent numbers from being entered
    if (/\d/.test(value)) {
      error = "Numbers are not allowed in State.";
    }


    if (error) {
      setStateError(error);
    } else {
      setStateError(""); // Clear error if input is valid
      setState(value); // Set the input value if valid
    }

   

  
  };
  
  return (
    <>
    {/* <Dashboard/> */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1 style={{ fontSize: '36px', color: '#333' }}>
        <i class="fa-solid fa-envelope"  style={{ marginRight: '10px' }}></i>
         
          Enquiries
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
          Here, you can either add a new enquiry or edit existing enquiries.
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
            <strong>Manage Enquiries</strong>
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
              + Add New Enquiry

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
    <option value={5} style={{ color: '#007bff', backgroundColor: '#f0f8ff' }}>5</option>
    <option value={10} style={{ color: '#28a745', backgroundColor: '#e6ffe6' }}>10</option>
    <option value={15} style={{ color: '#dc3545', backgroundColor: '#ffe6e6' }}>15</option>
    <option value={20} style={{ color: '#ffc107', backgroundColor: '#fff5e6' }}>20</option>
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
                  <th style={{ border: '1px solid black', padding:2 }}>Enquiry Id</th>
                  <th style={{ border: '1px solid black', padding: 2 }}>Course</th>
                  <th style={{ border: '1px solid black', padding: 2 }}>First Name</th>
                  <th style={{ border: '1px solid black', padding: 2 }}>Last  Name</th>
                  <th style={{ border: '1px solid black', padding: 2 }}>Phone</th>
                  <th style={{ border: '1px solid black', padding: 2 }}>Email</th>
                  <th style={{ border: '1px solid black', padding: 2}}>Is Active</th>
                  {/* <th style={{ border: '1px solid black', padding: 8 }}>Published At</th> */}
                  <th style={{ border: '1px solid black', padding: 2 }}>Date</th>
                  <th style={{ border: '1px solid black', padding: 2 }}>Actions</th>

                  
                </tr>
              </thead>
              <tbody>
                {currentExams.map((exam) => (
                  <tr key={exam.id}>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.code}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.addmision}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.title}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.last}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.phone}</td>
                    <td style={{ border: '1px solid black', padding: 8 }}>{exam.email}</td>
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
      contentLabel="Add/Edit Enquiry"
      style={{
        content: {
          width: "50%",
          height: "auto",
          margin: "0 auto",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "none",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", fontSize: "24px" }}>
        {editingExamId ? "Edit Enquiry" : "Add New Enquiry"}
      </h2>

      <form style={{ display: "flex", flexDirection: "column", gap: "15px", fontSize: "16px" }}>
        {/* Enquiry Id */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#333" }}>Enquiry Id:</label>
          <input
            type="text"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            placeholder='Example:EN123'
          />
          {examCode && !isValidExamCode && (
            <span style={{ color: "red" }}>
              Exam Code must contain at least one capital letter and one number.
            </span>
          )}
        </div>

        {/* Admission For */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#333" }}>Admission For:</label>
          <select
            value={addmision}
            onChange={(e) => setAddmision(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">------Select Course------</option>
            <option>(Xyz)(Fees:0.00)</option>
            <option>DBMS(D01)(Fees:6000.00)</option>
            <option>Defensive Diving Training (DTT)(Fees:8000.00)</option>
            <option>java(bca301)(Fees:2000.00)</option>
            <option>PGDCA(PGDCA)(Fees:7000.00)</option>
            <option>RSM(1/24)(Fees:0.00)</option>
            <option>test(123)(Fees:0.00)</option>
          </select>
          {!addmision && <span style={{ color: "red" }}></span>} 
        </div>

        {/* First Name */}
         <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ marginBottom: "5px", color: "#333" }}>First Name:</label>
      
      <input
        type="text"
        value={examTitle}
        onChange={handleExamTitleChange}
        onBlur={() => setExamTitleTouched(true)} // Mark the field as touched on blur
        required
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "5px", // Space below the input box
        }}
      />
      
      {/* Conditional error message that reserves space */}
      {examTitleTouched && (examTitleError || !examTitle) && (
        <span style={{ color: "red"}}>
          {examTitleError || "First Name is required."}
        </span>
      )}
    </div>

        {/* Last Name */}
<div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ marginBottom: "5px", color: "#333" }}>Last Name:</label>
      
      <input
        type="text"
        value={last}
        onChange={handleLastNameChange  }
        onBlur={() => setLastTouched(true)} // Mark the field as touched on blur
        required
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "5px", // Added space below the input box
        }}
      />
      
      {/* Conditional error message that will always reserve space */}
      {lastTouched && (error || !last) && (
        <span style={{ color: "red" }}>
          {error }
        </span>
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
  { !examDate.trim() === "" && (
    <span style={{ color: "red" }}>Please select a valid date.</span>
  )}
</div>
        {/* Gender */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#333" }}>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                value="Male"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                required
                style={{ marginRight: "5px" }}
              />
              Male
            </label>
            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                value="Female"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                required
                style={{ marginRight: "5px" }}
              />
              Female
            </label>
          </div>
          {!gender && <span style={{ color: "red" }}></span>}
        </div>

        {/* Phone */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#333" }}>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            placeholder='Example:8888888888'
          />
          {phone && !isValidPhone && (
            <span style={{ color: "red" }}>Phone number must be numeric and at least 10 digits.</span>
          )}
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#333" }}>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            placeholder='Example:abc123@gmail.com'
          />
          {email && !isValidEmail && <span style={{ color: "red" }}>Enter a valid email address as given in the Example.</span>}
        </div>

        {/* Address */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", color: "#333" }}>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            placeholder='Enter Address Here'
          />
          {!address && <span style={{ color: "red" }}></span>}
        </div>

        {/* City */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ marginBottom: "5px", color: "#333" }}>City:</label>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        required
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      {/* Conditional error message */}
      {cityError && (
        <span style={{ color: "red" }}>
          {cityError}
        </span>
      )}
    </div>


        {/* State */}
 <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ marginBottom: "5px", color: "#333" }}>State:</label>
      <input
        type="text"
        value={state}
        onChange={handleStateChange}
        onBlur={() => setStateTouched(true)} // Mark as touched on blur
        required
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      {/* Display error message when touched and no value is provided */}
      {stateTouched && !state && (
        <span style={{ color: "red" }}>State is required.</span>
      )}
      {/* Display validation error message if any */}
      {stateError && !stateTouched && (
        <span style={{ color: "red" }}>{stateError}</span>
      )}
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
      {  !addmision === "" && (
        <span style={{ color: "red" }}>Please select a Field.</span>
      )}


    </div>

        {/* Is Published */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ color: "#333" }}>Is Published:</label>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={() => setIsPublished((prev) => !prev)}
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button
            type="button"
            onClick={handleAddOrUpdateExam}
            style={{
              backgroundColor: isFormValid ? "green" : "gray",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: isFormValid ? "pointer" : "not-allowed",
            }}
            disabled={!isFormValid}
          >
            {editingExamId ? "Update Enquiry" : "Add Enquiry"}
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            style={{
              backgroundColor: "black",
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

export default Enquiries;