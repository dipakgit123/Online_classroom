import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { addStudent, allStudent, deleteStudent } from '../services/studentApiSlice';

const Students =()=>{
   const { data } = useSelector((state) => state.students); // Get exam list from Redux state
  const [searchTerm, setSearchTerm] = useState(''); 
  const [currentPage, setCurrentPage]=useState(true);
  const [entriesToShow, setEntriesToShow]=useState(5);

const students =useSelector((state)=>state.students.data);
const status=useSelector((state)=>state.students.status);
const dispatch = useDispatch();
  useEffect(()=>{
    if(status ==='idle'){
      dispatch(allStudent());
    }
  }, [status,dispatch]);

//search term
const lowercasedSearchTerm = searchTerm?.toLowerCase() || ''; // Handle undefined or null search term
const filteredStudents = data && data?.filter((student) => {
const data = Object.keys(student)
console.log("All Keys Of Students",data);
  const studentCourse = student?.course && typeof student.course === 'string' ? student.course.toLowerCase() : '';
  const studentFirstName = student.firstname && typeof student.firstname === 'string' ? student.firstname.toLowerCase() : '';
  const studentLastName = student.lastname && typeof student.lastname === 'string' ? student.lastname.toLowerCase() : '';
  const studentEnrollmentId = student.enrollment_id && typeof student.enrollment_id === 'string' ? student.enrollment_id.toLowerCase() : '';
  const studentBatch = student.batch && typeof student.batch === 'string' ? student.batch.toLowerCase() : '';
  const studentDuration = student.duration && typeof student.duration === 'string' ? student.duration.toLowerCase() : '';
  const studentFeesPayable = student.feespayable && typeof student.feespayable === 'string' ? student.feespayable.toLowerCase() : '';
  const studentFeesPaid = student.feespaid && typeof student.feespaid === 'string' ? student.feespaid.toLowerCase() : '';
  const studentFeesStatus = student.feesstatus && typeof student.feesstatus === 'string' ? student.feesstatus.toLowerCase() : '';
  const studentPhone = student.phone && typeof student.phone === 'string' ? student.phone.toLowerCase() : '';

  return (
    studentCourse.includes(lowercasedSearchTerm) ||
    studentFirstName.includes(lowercasedSearchTerm) ||
    studentLastName.includes(lowercasedSearchTerm) ||
    studentEnrollmentId.includes(lowercasedSearchTerm) ||
    studentBatch.includes(lowercasedSearchTerm) ||
    studentDuration.includes(lowercasedSearchTerm) ||
    studentFeesPayable.includes(lowercasedSearchTerm) ||
    studentFeesPaid.includes(lowercasedSearchTerm) || 
    studentFeesStatus.includes(lowercasedSearchTerm) ||
    studentPhone.includes(lowercasedSearchTerm) 
  );
});

//pagination 
const totalPages = Math.ceil(filteredStudents.length / entriesToShow);
// Get the current fees for the current page
const indexOfLastStudents = currentPage * entriesToShow;
const indexOfFirstStudents = indexOfLastStudents - entriesToShow;
const currentStudents = filteredStudents.slice(indexOfFirstStudents, indexOfLastStudents);
// Handle page change
const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};
// Handle the change in number of entries to show per page
const handleEntriesToShowChange = (e) => {
  setEntriesToShow(Number(e.target.value));  // Update entriesToShow
  setCurrentPage(1);  // Reset to first page when changing the number of entries
};


  //pop for add student
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

// add new students 
const initialValue={
  enrollment_id: '',
  course: '',
  batch: '',
  firstname: '',
  lastname: '',
  address: '',
  state: '',
  city: '',
  zip: '',
  nationality: '',
  phone: '',
  email: '',
  feespayable: '',
  feespaid: '',
  feesstatus: '',
  qualification:'',
  gender:'',
  registrationDateTime:'',
  addedBy:'',
  date:''
};

  const [student, setStudent]=useState(initialValue);
  const [errors, setErrors]=useState({});
  const navigate = useNavigate();

  const[enrollment_id, setEnrollmentId] = useState("");
  const[course, setCourse] = useState("");
  const[batch, setBatch] = useState("");
  const[duration, setDuration] = useState("");
  const [firstname, setFirstname] = useState("");
  const[lastname, setLastname] = useState("");
  const[address, setAddress] = useState("");
  const [state,setState]  = useState("");
  const [city,setCity]  = useState("");
  const [zip,setZip]  = useState("");
  const [nationality,setNationality]  = useState("");
  const [phone,setPhone]  = useState("");
  const [email,setEmail]  = useState("");
  const [feespayable,setFeespayable]  = useState("");
  const [feespaid,setFeesPaid]  = useState("");
  const [feesstatus,setFeesStatus]  = useState("");
  const [qualification,setQualification]  = useState("");
  const [gender,setGender]  = useState("");
  const [registrationDateTime,setRegistrationDateTime]  = useState("");
  const [addedBy,setAddedBy]  = useState("");
  const [date, setDate] = useState("");
  const[clicked, setClicked] = useState(false);

  const onValueChange=(e)=>{
    const { name, value } = e.target;
     if (name === 'enrollment_id') {
      setEnrollmentId(value);
      // Clear the error when the user clicks or interacts with the input
      setErrors((prevErrors) => ({ ...prevErrors, enrollment_id: '' }));
  }

     if(name === 'course') {setCourse(value);
      setErrors((prevErrors) => ({ ...prevErrors, course: '' }));
     }
     if(name === 'batch') {setBatch(value);
      setErrors((prevErrors) => ({ ...prevErrors, batch: '' }));
     }
     if(name === 'duration') {setDuration(value);
      setErrors((prevErrors) => ({ ...prevErrors, duration: '' })); 
     }
     if(name === 'firstname') {setFirstname(value);
      setErrors((prevErrors) => ({ ...prevErrors, firstname: '' }));
     }
     if(name === 'lastname') {setLastname(value);
      setErrors((prevErrors) => ({ ...prevErrors, lastname: '' }));
     }
     if(name === 'address') {setAddress(value);
      setErrors((prevErrors) => ({ ...prevErrors, address: '' }));
     }
     if(name === 'state') {setState(value);
      setErrors((prevErrors) => ({ ...prevErrors, state: '' }));
     }
     if(name === 'city') {setCity(value);
      setErrors((prevErrors) => ({ ...prevErrors, city: '' }));
     }

     if(name === 'zip') {setZip(value);
      setErrors((prevErrors) => ({ ...prevErrors, zip: '' }));
     }
     if(name === 'nationality') {setNationality(value);
      setErrors((prevErrors) => ({ ...prevErrors, nationality: '' }));
     }
     if(name === 'phone') {setPhone(value);
      setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
     }
     if(name === 'email') {setEmail(value);
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));  
     }
     if(name === 'feespayable') {setFeespayable(value);
      setErrors((prevErrors) => ({ ...prevErrors, feespayable: '' }));
     }
     if(name === 'feespaid') {setFeesPaid(value);
      setErrors((prevErrors) => ({ ...prevErrors, feespaid: '' }));
     }
     if(name === 'feesstatus') {setFeesStatus(value);
      setErrors((prevErrors) => ({ ...prevErrors, feesstatus: '' }));
     }
     if(name === 'qualification') {setQualification(value);
      setErrors((prevErrors) => ({ ...prevErrors, qualification: '' }));
     }
     if(name === 'gender') {setGender(value);
      setErrors((prevErrors) => ({ ...prevErrors, gender: '' }));
     }
     if(name === 'registrationDateTime') {setRegistrationDateTime(value);
      setErrors((prevErrors) => ({ ...prevErrors, registrationDateTime: '' }));
     }
     if(name === 'addedBy') {setAddedBy(value);
      setErrors((prevErrors) => ({ ...prevErrors, addedBy: '' }));
     }
     if(name === 'date') {setDate(value);
      setErrors((prevErrors) => ({ ...prevErrors, date: '' }));
     }
    setStudent({...student,[e.target.name]:e.target.value});
   // console.log(student);
  }

  const validationForm =(stdDetails)=>{ 
    const errors={};

if (!/[0-9]{6}/.test(stdDetails.enrollment_id)) {
  errors.enrollment_id = "Enrollment id should  allows exactly 6 digit number(eg:852369)";
}
if (!/[A-Za-z]/.test(stdDetails.firstname)) {
  errors.firstname = "First name should  allows in 'Jonh'";
}
if (!/\d+\.\d{2}/.test(stdDetails.feespayable)) {
  errors.feespayable = "Requires exactly two decimal places (eg.5000.00)";
}
if (!/\d+\.\d{2}/.test(stdDetails.feespaid)) {
  errors.feespaid = "Requires exactly two decimal places (eg.5000.00)";
}
if (!/[A-Za-z]/.test(stdDetails.lastname)) {
  errors.lastname = "Last name should  allows in 'Xyz'";
}
if(!stdDetails.email.trim()){
  errors.email="Email required in this abc12@gmail.com format"
}else if(!/^\S+@\S+\.\S+$/.test(stdDetails.email)){
  errors.email="Invalid email."
}
if(!stdDetails.phone.trim()){
  errors.phone="Phone require in this 9657686920."
}else if(!/^\d{10}$/.test(stdDetails.phone)){
  errors.phone="Invalid phone."
}
if (!/[0-9]{3}/.test(stdDetails.batch)) {
  errors.batch = "Batch ID should be exactly a 3-digit number eg(101)";
}
if (!/\d+\s*(months|years)/.test(stdDetails.duration)) {
  errors.duration = "Duration should be a number followed by 'months' or 'years'(e.g., 6 months, 2 years)";
}
if (!/[0-9]{5}/.test(stdDetails.zip)) {
  errors.zip = "Zip code should  allows exactly 5 digit number(eg:85236)";
}
if (!/[A-Za-z\s.]+/.test(stdDetails.qualification)) {
  errors.qualification = "Qualification for eg(BE. ME, B.Com, Bachelor of Science Diploma";
}
if (!/[a-zA-Z0-9\s,.’-]{3,}/.test(stdDetails.address)) {
  errors.address = "Address requires in this format e.g(45 Kings Rd, Apt 9)";
}
if(!stdDetails.date || stdDetails.date.length ===0){
  errors.date="Please Select the DOB"
}
if(!stdDetails.registrationDateTime || stdDetails.registrationDateTime.length ===0){
  errors.registrationDateTime="Please Select the registration date and time"
}
if(!stdDetails.course || stdDetails.course.length ===0){
  errors.course="Please Select the at least one course"
}
if(!stdDetails.course || stdDetails.addedBy.length ===0){
  errors.addedBy="Please Select the at least one option"
}
if(!stdDetails.city || stdDetails.city.length ===0){
  errors.city="Please Select at least one city"
}
if(!stdDetails.state || stdDetails.state.length ===0){
  errors.state="Please Select at least one state"
}
if(!stdDetails.nationality || stdDetails.nationality.length ===0){
  errors.nationality="Please Select the nationality"
}
if(!stdDetails.gender || stdDetails.gender.length ===0){
  errors.gender="Please Select the gender"
}
return errors;
}

  const addStudentDetails= async(e)=>{
    e.preventDefault();
    const newErrors=validationForm(student);
    setErrors(newErrors)

    const payable = parseFloat(student.feespayable);
  const paid = parseFloat(student.feespaid);
    if (!isNaN(payable) && !isNaN(paid)) {
      if (paid === payable) {
        student.feesstatus = "Paid";
      } else if (paid < payable) {
        student.feesstatus = `Pending: ${(payable - paid).toFixed(2)}`;
      } else {
        student.feesstatus = "Overpaid"; // In case of extra payment
      }
    }

    if(Object.keys(newErrors).length===0){
      dispatch(addStudent(student));
    toast.success("Student add successfully")
    navigate('/dashboard/students');
    setOpen(false); 
    setClicked(true);
  }else{
  toast.error("Student details are invalid");
  }
    }
    
  return (
    <>
  <div style={{marginTop:'20px', textAlign:'center' }}> 
    <h1 style={{ fontSize: '36px', color: '#333',textAlign: 'center' }}>
          <PeopleAltIcon style={{marginRight:'10px',fontSize:'38px'}}></PeopleAltIcon> Students</h1>
          <div style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724', padding: '15px', fontSize: '16px', borderRadius: '4px',
            marginBottom: '20px',
            width: 'auto',
            margin: '0 auto',}} >
          Here, you can either add a new student or edit existing students.
        </div>

        <div
          style={{ maxWidth: 'auto',  margin: '0 auto', borderRadius: '4px', border: '1px solid #DEDEDE', 
            padding: '15px', marginTop: '20px'}}>

          <div style={{ backgroundColor:"#F6F6F6",color: '#000',padding: '15px', fontSize: '18px', textAlign: 'left', borderRadius: '4px',marginBottom: '20px',
              border: '1px solid white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }} ><strong>Manage Students</strong> 

            <button style={{color: 'blue',padding: '10px 20px', border: '1px solid blue', borderRadius: '4px', fontSize: '16px',
                cursor: 'pointer', }} onClick={handleClickOpen}>
             + Add New Students
            </button>
          </div>

          {/* add new students form */}
            <Dialog open={open} onClose={handleClose} style={{margin:"10px 10px", padding:"5px",border:"1px solid #DEDEDE"}}>
            < CloseOutlinedIcon  style={{ position: 'absolute', right: '5px',color: 'gray' ,top:"5px",cursor:'pointer'}}
    onClick={handleClose} /> 
          <form  className="edit-form"  style={{margin:'30px 30px'}}>  
         
            <h1 className="form-title">Add New Student</h1>
            
            <div className="form-group">
        <label>Enrollment ID:</label>
        <input className="form-input" name="enrollment_id" value={student.enrollment_id} onChange={(e) => {const value = e.target.value;
    // Ensure the prefix 'EN' remains at the start
            const updatedValue = value.startsWith('EN') ? value : 'EN' + value.replace(/^EN/, '');
                onValueChange({ target: { name: 'enrollment_id', value: updatedValue } });
            }} placeholder='Enrollment ID' />
            {errors.enrollment_id && ( <span className="error-message"> {errors.enrollment_id}</span>)}
      </div>

      <div className="form-row">
      <div className="form-group">
        <label>First Name:</label>
        <input  className="form-input" name="firstname" onChange={(e)=>onValueChange(e)} placeholder='First Name'/>
   {errors.firstname && ( <span className="error-message"> {errors.firstname}</span>)}
      </div>

      <div className="form-group">
        <label>Last Name:</label>
        <input className="form-input"  name="lastname" onChange={(e)=>onValueChange(e)}  placeholder='Last Name' />
        {errors.lastname && (<span className="error-message">{errors.lastname} </span>)} 
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Email:</label>
        <input className="form-input" name="email" onChange={(e)=>onValueChange(e)} placeholder='Email'/>
         {errors.email && ( <span className="error-message"> {errors.email}</span>)}
      </div>

      <div className="form-group">
      <label>Phone:</label>
        <input className="form-input"  name="phone" onChange={(e)=>onValueChange(e)} placeholder='Phone'/>
         {errors.phone && ( <span className="error-message"> {errors.phone} </span>)}
      </div>
      </div>

  <div className="form-row">
      <div className="form-group">
        <label>Batch:</label>
        <input className="form-input" name="batch"  onChange={(e)=>onValueChange(e)} placeholder='Batch No' />
        {errors.batch && ( <span className="error-message"> {errors.batch}</span>)}
      </div>
      <div className="form-group">
        <label>Duration:</label>
        <input className="form-input" name="duration" onChange={(e)=>onValueChange(e)}  placeholder='Duration'/>
        {errors.duration && ( <span className="error-message"> {errors.duration}</span>)}
      </div>
      </div>

      <div className="form-group">
        <label>Admission For:</label>
        <select   className="form-input"  name="course"  onChange={(e)=>onValueChange(e)} style={{ border: 'none', outline: 'none', borderRadius:"10px",backgroundColor:"#DEDEDE", WebkitAppearance: "none",appearance: "none"}}>
            <option>------Select Course------</option>
            <option >(Xyz)</option>
            <option >DBMS(D01)</option>
            <option >Defensive Diving Training (DTT)</option>
            <option>java(bca301)</option>
            <option>PGDCA(PGDCA)</option>
            <option>RSM(1/24)</option>
            <option>Data Anylyst</option>
            <option>Salesforce</option>
            <option>SAP</option>
            <option>Python</option>
        </select>
        {errors.course && (<span className="error-message"> {errors.course}</span>)}
      </div>

      
    <div className="form-row">
      <div style={{margin:'10px 0'}}>
      <label>Gender:-</label>
      <div className="gender-options">
            <input  type="radio" name="gender" value="male" onChange={(e)=>onValueChange(e)} style={{marginRight:"5px"}} />Male
            <input  type="radio" name="gender" value="female" onChange={(e)=>onValueChange(e)} style={{marginRight:"5px"}}/>Female 
        {errors.gender && (<span className="error-message"> {errors.gender}</span>)}
        </div>
      </div>

      <div className='form-group'>
        <label>Date of Birth</label>
        <input className='form-input' type='date' name='date' onChange={(e)=>onValueChange(e)} placeholder='DOB'></input>
        {errors.date && (<span className="error-message"> {errors.date}</span>)}
      </div>
      </div>


      <div className="form-row">
      <div className="form-group">
        <label>Address:</label>
        <textarea className="form-input" name="address" onChange={(e)=>onValueChange(e)} placeholder='Address'></textarea>
        {errors.address&& ( <span className="error-message"> {errors.address}</span>)}
      </div>

      <div className="form-group">
      <label>Zip Code:</label>
      <input className="form-input" name="zip" onChange={(e)=>onValueChange(e)} placeholder='Zip Code'/>
      {errors.zip && (<span className="error-message"> {errors.zip}</span>)}
      </div>
      </div>

      <div className="form-row">
      <div className="form-group">
      <label>City:</label>
        <select className="form-input" name="city" onChange={(e)=>onValueChange(e)} style={{ border: 'none', outline: 'none', borderRadius:"10px",backgroundColor:"#DEDEDE", WebkitAppearance: "none",appearance: "none"}}>
          <option>---Select Your City---</option>
          <option>Pune</option>
          <option>Mumbai</option>
          <option>Hyderabad</option>
          <option>Jaipur</option>
          <option>Surat</option>
          <option>Banglore</option>
          <option>Chennai</option>
          <option>Kolkata</option>
          <option>Mohali</option>
        </select>
        {errors.city && (<span className="error-message"> {errors.city}</span>)}    
      </div>
  
      <div className="form-group">
      <label>State:</label>
      <select className="form-input"  name="state" onChange={(e)=>onValueChange(e)} style={{ border: 'none', outline: 'none', borderRadius:"10px",backgroundColor:"#DEDEDE", WebkitAppearance: "none",appearance: "none"}}>
        <option>---Select Your State---</option>
        <option>Andhra Pradesh</option>
        <option>Maharashtra</option>
        <option>Karnataka</option>
        <option>Tamil Nadu</option>
        <option>Punjab</option>
        <option>West  Bengal</option>
        <option>Gujarat</option>
        <option>Rajasthan</option>
      </select>
      {errors.state && (<span className="error-message"> {errors.state}</span>)}
      </div>
      </div>

      <div className="form-row">
      <div className="form-group">
      <label>Nationality:</label>
        <select className="form-input" name="nationality" onChange={(e)=>onValueChange(e)} style={{ border: 'none', outline: 'none', borderRadius:"10px",backgroundColor:"#DEDEDE" , WebkitAppearance: "none",appearance: "none"}}>
          <option>---Select Nationality---</option>
          <option>Indian</option>
        </select>
        {errors.nationality && ( <span className="error-message"> {errors.nationality} </span>)}
      </div>

      <div className="form-group">
        <label>Qualification:</label>
        <input  className="form-input" name="qualification" onChange={(e)=>onValueChange(e)} placeholder='Qualification'></input>
        {errors.qualification && (<span className="error-message"> {errors.qualification}</span>)}
      </div>
      </div>

      <div className='form-row'>
      <div className="form-group">
        <label>Fees Payable:</label>
        <input className="form-input"  name="feespayable" onChange={(e)=>onValueChange(e)} placeholder='Fees Payable' />
        {errors.feespayable && (<span className="error-message"> {errors.feespayable}</span>)}
      </div>

      <div className="form-group">
        <label>Fees Paid:</label>
        <input className="form-input" name="feespaid" onChange={(e)=>onValueChange(e)}  placeholder='Fees Paid'/>
        {errors.feespaid && (<span className="error-message"> {errors.feespaid}</span>)}
      </div>
      </div>

      <div className="form-group">
        <label>Fees Status:</label>
        <input className="form-input" name="feesstatus" onChange={(e)=>onValueChange(e)} value={student.feesstatus} readOnly/>
      </div>

      <div className="form-group">
        <label>Registration Date:</label>
        <input className="form-input" name="registrationDateTime" type='date' onChange={(e)=>onValueChange(e)}/>
        {errors.registrationDateTime && ( <span className="error-message"> {errors.registrationDateTime} </span>)}
      </div>

      <div className="form-group">
      <label>AddedBy:</label>
        <select className="form-input" name="addedBy" onChange={(e)=>onValueChange(e)} style={{ border: 'none', outline: 'none', borderRadius:"10px",backgroundColor:"#DEDEDE" , WebkitAppearance: "none",appearance: "none"}}>
          <option>---Added By---</option>
          <option>User</option>
          <option>Admin</option>
        </select>
        {errors.addedBy && ( <span className="error-message"> {errors.addedBy} </span>)}
      </div>
    
        <DialogActions>
<Button type="submit" variant="contained" onClick={addStudentDetails}
style ={{
  backgroundColor: enrollment_id && course && batch && duration && firstname && lastname && address && state && city && zip && nationality && phone && email && feespayable && feespaid  && qualification && gender && registrationDateTime && addedBy && Date ? "green" :"gray",
    // color: enrollment_id && course && batch && duration && firstname && lastname && address && state && city && zip && nationality && phone && email && feespayable && feespaid  && qualification && gender && registrationDateTime && addedBy && Date ? "white" :"white",
    cursor: enrollment_id && course && batch && duration && firstname && lastname && address && state && city && zip && nationality && phone && email && feespayable && feespaid  && qualification && gender && registrationDateTime && addedBy && Date ? "pointer":"not-allowed",
   }}
   disabled = {clicked || (enrollment_id && course && batch && duration && firstname && lastname && address && state && city && zip && nationality && phone && email && feespayable && feespaid && feesstatus && qualification && gender && registrationDateTime && addedBy )}
>Add New Student</Button>
          <Button onClick={handleClose} variant="contained" style={{backgroundColor:'red',color:'white'}}>Close</Button>
        </DialogActions>
          </form>
          </Dialog>
          
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>Entries to show:</span>
              <select   value={entriesToShow} onChange={handleEntriesToShowChange} style={{ padding: '10px' }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div style={{display:'flex' ,justifyContent:"end"}} >
              Search:<input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='Search_Item'/>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <table style={{ borderCollapse: 'collapse', margin: '0 auto', width: '100%', border: '1px solid #ccc', }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid black', padding: "8px" }}>Enrollment ID</th>
                  <th style={{ borderBottom: '1px solid black', borderLeft: '1px solid #DEDEDE', padding: "8px" }}>Course</th>
                  {/* <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE', padding: "8px" }}>Batch</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE', padding: "8px" }}>Duration</th> */}
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE', padding: "8px" }}>First Name</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE', padding: "8px" }}>Last Name</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE', padding: "8px" }}>Fees Payable</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE', padding: "8px" }}>Fess Paid</th>
                  {/* <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE', padding: "8px" }}>Fess Status</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE', padding: "8px" }}>Phone</th> */}
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE', padding: "8px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (<StudentRow key={index} student={student}/>))}
              </tbody>
            </table>
          </div>


  {/* Pagination controls */}
  <div style={{marginTop: '20px', display: 'flex', justifyContent: 'end', padding: '10px 10px',borderRadius: '10px'}}>
    {/* Previous button */}
    <Button variant="contained" color="default" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}
      style={{margin: '0 5px',fontSize: '12px',minWidth: '60px',padding: '6px 12px',borderRadius: '8px'}}>Previous </Button>

    {/* Pagination buttons */}
    {[...Array(totalPages)].map((_, index) => (
      <Button key={index} variant="contained" color={currentPage === index + 1 ? 'primary' : 'default'} onClick={() => handlePageChange(index + 1)}
        style={{margin: '0 5px',fontSize: '12px',minWidth: '40px',padding: '6px 12px', borderRadius: '50%',
          backgroundColor: currentPage === index + 1 ? '#3f51b5' : '#e0e0e0',
          color: currentPage === index + 1 ? '#fff' : '#333',transition: 'background-color 0.3s ease',}}>
        {index + 1}
      </Button>
    ))}

    {/* Next button */}
    <Button variant="contained" color="default" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}
      style={{margin: '0 5px', fontSize: '12px', minWidth: '60px',padding: '6px 12px',borderRadius: '8px'}}>
      Next
    </Button>
  </div>
        </div>

      </div>
     
    </>
  );
};


// StudentRow Component
const StudentRow = ({ student = [] }) => {


  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();  // to dispatch actions to Redux store
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //delete
 const deleteStudentData=(id)=>{
  dispatch(deleteStudent(id));
 }

//edit user detail

  return (
    <>
    <Toaster/>
    <tr>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{student.enrollment_id}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{student.course}</td>
      {/* <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{student.batch}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{student.duration}</td> */}
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{student.firstname}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{student.lastname}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{student.feespayable}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8,}}>{student.feespaid}</td>
      {/* <td style={{ border: '1px solid #DEDEDE', padding: 8,color:'green' }}>{student.feesstatus}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{student.phone}</td> */}
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>   
      {/* Button to open the dialog */}
      <Button style={{ color: 'blue' }} onClick={handleClickOpen}>  <VisibilityIcon /></Button>
      <Link to={`/dashboard/editstudents/${student.id}`}  color="primary" ><EditIcon /></Link>
      <Button style={{color:"red"}} onClick={()=>deleteStudentData(student.id)} ><DeleteIcon /></Button>
        </td>
      </tr>

      {/* Dialog to show student details   */}
      <Dialog open={open} onClose={handleClose} style={{margin: "20px",  borderRadius: "5px", boxShadow: "0px 3px 6px rgba(0,0,0,0.2)" }}>
        < CloseOutlinedIcon  style={{ position: 'absolute', right: '10px',color: 'gray' ,top:"5px" ,cursor:"pointer"}}
    onClick={handleClose} />
        <DialogContent   style={{padding: '20px', display: 'flex', flexDirection: 'column',  rowGap: '5px', backgroundColor: '#f9f9f9', borderRadius: '8px', border:"1px solid #DEDEDE",margin:"30px 20px" }}>
        <p><b>Enrollment ID:</b>{student.enrollment_id}</p>
          <p><b>First Name:</b>{student.firstname}</p>
          <p><b>Last Name:</b>{student.lastname}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Phone:</b>{student.phone}</p>
          <p><b>Course:</b>{student.course}</p>
          <p><b>Batch:</b>{student.batch}</p>
          <p><b>Duration:</b>{student.duration}</p>
          <p><b>Gender:</b> {student.gender}</p>
          <p><b>Date of Birth:</b>{student.date}</p>
          <p><b>Address:</b> {student.address}</p>
          <p><b>Zip:</b> {student.zip}</p>
          <p><b>City:</b> {student.city}</p>
          <p><b>State:</b> {student.state}</p>
          <p><b>Nationality:</b> {student.nationality}</p>
          <p><b>Fees Payable:</b>{student.feespayable}</p>
          <p><b>Fees Paid:</b>{student.feespaid}</p>
          <p><b>Fees Status:</b>{student.feesstatus}</p>
          <p><b>Qualification:</b>{student.qualification}</p>
          <p><b>Registration Date:</b> {student.registrationDateTime}</p>
          <p><b>Added By:</b> {student.addedBy}</p>
          {/* Edit and Delete Buttons */}
          <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center',marginTop: '5px',gap:"10px"}}>
          </div>
        </DialogContent>
        <DialogActions>
          {/* Button to close the dialog */}
          <Button onClick={handleClose} variant="contained" style={{backgroundColor:'red',color:'white', marginBottom:'20px', marginRight:'20px'}}>Close</Button>
        </DialogActions>  
      </Dialog>
      <Outlet/>
    </>
  );
};
export default Students;