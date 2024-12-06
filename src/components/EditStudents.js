import { Button, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; // for navigation and getting user ID
import { editStudent, getSingleStudent } from '../services/studentApiSlice';




 // assuming you're getting the user id from the route
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
  qualification:'',
  gender:'',
  registrationDateTime:'',
  addedBy:'',
  date:''
};
const EditStudents = () => {
  

const [student, setStudent]=useState(initialValue);
const [errors, setErrors]=useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedStudent =useSelector((state)=>state.students.selectedStudent);
  useEffect(()=>{
    if(id){
    //   console.log('Fetching fees with ID:', id); 
    dispatch(getSingleStudent(id));
  }
  },[dispatch,id]);

  useEffect(()=>{
    if(selectedStudent){
      setStudent(selectedStudent);
    }
  },[selectedStudent ,id]);

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
    };
  


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
      if (!/[a-zA-Z0-9\s,.’-]{3,}/.test(stdDetails.address)) {
        errors.address = "Address requires in this format e.g(45 Kings Rd, Apt 9)";
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
        errors.qualification = "Qualification for eg(BE. ME, B.Com, Bachelor of Science Diploma)";
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
    };

  
  const editStudentDetails= (e)=>{
    e.preventDefault();
    const newErrors=validationForm(student); 
    setErrors(newErrors); 

    // const payable = parseFloat(student.feespayable);
    // const paid = parseFloat(student.feespaid);
    //   if (!isNaN(payable) && !isNaN(paid)) {
    //     if (paid === payable) {
    //       student.feesstatus = "Paid";
    //     } else if (paid < payable) {
    //       student.feesstatus = `Pending: ${(payable - paid).toFixed(2)}`;
    //     } else {
    //       student.feesstatus = "Overpaid"; // In case of extra payment
    //     }
    //   }


    if(Object.keys(newErrors).length===0){
    // await editUser(user,id);
    dispatch(editStudent({id,editStudent:student}));
    toast.success("Student  details updated successfully");

    navigate('/dashboard/students');
    
  }else{
    toast.error("Student details are invlid to update");
  }  
  };


    //pop
    const [isFormVisible, setIsFormVisible] = useState(true); // Form visibility state
    const handleClose = () => {
        setIsFormVisible(false); // Hide the form when the close button is clicked
        navigate('/dashboard/students')
      };


  return (
    <>
    <div>
        <Toaster/>
        <div style={{marginTop:"20px", padding:"5px",border:"1px solid #DEDEDE", marginRight:'20px'}}>
       
            {isFormVisible &&(
          <form className="edit-form"  tyle={{margin:"30px"}}>
            <h1 className="form-title">Update Student</h1>
            <div className="form-group">
        <label>Enrollment ID:</label>
        <input className="form-input" name="enrollment_id" value={student.enrollment_id} onChange={(e)=>onValueChange(e)}  />
        {errors.enrollment_id && (<span className="error-message"> {errors.enrollment_id}</span>)}
      </div>

         {/* First Name and Last Name in one row */}
    <div className="form-row">
      <div className="form-group">
        <label>First Name:</label>
        <input className="form-input" name="firstname" value={student.firstname} onChange={(e)=>onValueChange(e)} />
          {errors.firstname && (<span className="error-message"> {errors.firstname}</span>)}
      </div>
      
      <div className="form-group">
        <label>Last Name:</label>
        <input className="form-input" name="lastname" value={student.lastname} onChange={(e)=>onValueChange(e)} /> 
        {errors.lastname && (<span className="error-message"> {errors.lastname}</span>)}
      </div>
    </div>

    
    <div className="form-row">
      <div className="form-group">
        <label>Email:</label>
        <input className="form-input" name="email" value={student.email} onChange={(e)=>onValueChange(e)} />
         {errors.email && (<span className="error-message"> {errors.email}</span>)}
      </div>

      <div className="form-group">
      <label>Phone:</label>
        <input className="form-input" name="phone" value={student.phone} onChange={(e)=>onValueChange(e)} /> 
        {errors.phone && (<span className="error-message"> {errors.phone}</span>)}
      </div>
      </div>

<div className='form-row'>
      <div className="form-group">
        <label>Batch:</label>
 <input className="form-input" name="batch" value={student.batch} onChange={(e)=>onValueChange(e)}  />
 {errors.batch && (<span className="error-message"> {errors.batch}</span>)}
      </div>

      <div className="form-group">
        <label>Duration:</label>
 <input className="form-input" name="duration" value={student.duration} onChange={(e)=>onValueChange(e)}  />
 {errors.duration && (<span className="error-message"> {errors.duration}</span>)}
      </div>
      </div>


      <div className="form-group">
        <label>Admission For:</label>
        <select  className="form-input" name="course"  value={student.course}  onChange={(e)=>onValueChange(e)} >
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
          <label >
            <input  
              type="radio" 
              name="gender" 
              value="male" 
              checked={student.gender === "male"} 
              onChange={onValueChange}
              style={{marginRight:"5px"}} 
            />
            Male
          </label>
          <label style={{paddingLeft:"20px"}}>
            <input  
              type="radio" 
              name="gender" 
              value="female" 
              checked={student.gender === "female"} 
              onChange={onValueChange} 
              style={{marginRight:"5px"}}/>
            Female
          </label>
        </div>
      </div>

      {/* <div className='form-group'>
        <label>Date of Birth</label>
        <input className='form-input' type='date' name='date' onChange={(e)=>onValueChange(e)} placeholder='DOB'></input>
        {errors.date && (<span className="error-message"> {errors.date}</span>)}
      </div> */}
      </div>
   

      <div className="form-row">
      <div className="form-group">
        <label>Address:</label>
        <textarea className="form-input" name="address" value={student.address} onChange={(e)=>onValueChange(e)}
        ></textarea>
        {errors.address && (<span className="error-message"> {errors.address}</span>)}

      </div>

      <div className="form-group">
      <label>Zip Code:</label>
      <input className="form-input" name="zip" value={student.zip} onChange={(e)=>onValueChange(e)} />
        {errors.zip && (<span className="error-message"> {errors.zip}</span>)}
      </div>
      </div>

      <div className="form-row">
      <div className="form-group">
      <label>City:</label>
        <select className="form-input" name="city" value={student.city} onChange={(e)=>onValueChange(e)} style={{ border: 'none', outline: 'none', borderRadius:"10px",backgroundColor:"#DEDEDE", WebkitAppearance: "none",appearance: "none"}} >
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
        <select className="form-input" name="state" value={student.state} onChange={(e)=>onValueChange(e)} style={{ border: 'none', outline: 'none', borderRadius:"10px",backgroundColor:"#DEDEDE", WebkitAppearance: "none",appearance: "none"}}>
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
        <input className="form-input" name="nationality"  value={student.nationality} onChange={(e)=>onValueChange(e)} /> 
        {errors.nationality && (<span className="error-message"> {errors.nationality}</span>)}
      </div>

      <div className="form-group">
        <label>Qualification:</label>
        <input className="form-input"  name="qualification"  value={student.qualification}  onChange={(e)=>onValueChange(e)}  />
        {errors.qualification && (<span className="error-message"> {errors.qualification}</span>)}
      </div>
      </div>

{/* <div className='form-row'>
      <div className="form-group">
        <label>Fees Payable:</label>
        <input  className="form-input" name="feespayable"  value={student.feespayable}  onChange={(e)=>onValueChange(e)}/>
        {errors.feespayable && (<span className="error-message"> {errors.feespayable}</span>)}
      </div>

      <div className="form-group">
        <label>Fees Paid:</label>
        <input  className="form-input"  name="feespaid"   value={student.feespaid}  onChange={(e)=>onValueChange(e)} />
        {errors.feespaid && (<span className="error-message"> {errors.feespaid}</span>)}
      </div>
      </div> */}
{/* 
      <div className="form-group">
        <label>Fees Status:</label>
        <input className="form-input" name="feesstatus" value={student.feesstatus} onChange={(e)=>onValueChange(e)} />
      </div> */}

      <div className="form-group">
        <label>Registration Date:</label>
        <input className="form-input" name="registrationDateTime" type='date'  value={student.registrationDateTime} onChange={(e)=>onValueChange(e)}/>
        {errors.registrationDateTime && ( <span className="error-message"> {errors.registrationDateTime} </span>)}
      </div>


      <div className="form-group">
      <label>AddedBy:</label>
        <select className="form-input" name="addedBy" value={student.addedBy} onChange={(e)=>onValueChange(e)} style={{ border: 'none', outline: 'none', borderRadius:"10px",backgroundColor:"#DEDEDE" , WebkitAppearance: "none",appearance: "none"}}>
          <option>---Added By---</option>
          <option>User</option>
          <option>Admin</option>
        </select>
        {errors.addedBy && ( <span className="error-message"> {errors.addedBy} </span>)}
      </div>
  
            <DialogActions>
          {/* Button to close the dialog */}
          <Button type="submit" variant="contained" color="primary" className="btn-submit"  onClick={editStudentDetails}> Update Student </Button>
          <Button onClick={handleClose} variant="contained" style={{backgroundColor:'red',color:'white'}}>Close</Button>
        </DialogActions>
          </form>
          )}
          </div>
    </div>
    </>
  )
}

export default EditStudents;