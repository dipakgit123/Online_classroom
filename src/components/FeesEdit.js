import { Button, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editFees, getSingleFees } from '../services/apiFeesSlice';


const initialValue={
    receipt:'',
    amount:'',
    enroll_id:'',
    studentname: '',
   paymentmethod:'',
   paymentid:'',
   date:'',
   addedby:''
  };
const FeesEdit = () => {
    const[fees, setFees]=useState(initialValue);
    const [errors, setErrors]=useState({});
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { id } = useParams();

  const selectedFees =useSelector((state)=>state.fees.selectedFees);
  useEffect(()=>{
    if(id){
    //   console.log('Fetching fees with ID:', id); 
    dispatch(getSingleFees(id));
  }
  },[dispatch,id]);

  useEffect(()=>{
    if(selectedFees){
      setFees(selectedFees);
    }
  },[selectedFees,id]);

  const[receipt, setReceipt]=useState("");
  const[amount, setAmount] = useState("");
  const[enroll_id, setEnroll_id] = useState("");
  const[studentname, setStudentName] = useState("");
  const [paymentmethod, setPaymentMethod] = useState("");
  const [paymentid, setPaymentId] = useState("")
  const[date, setDate] = useState("");
  const[addedby, setAddedby] = useState("");
  // const[clicked, setClicked] = useState(false);

  const onValueChange=(e)=>{
    const { name, value } = e.target;
    if (name === 'enroll_id') {
      setEnroll_id(value);
      // Clear the error when the user clicks or interacts with the input
      setErrors((prevErrors) => ({ ...prevErrors, enroll_id: '' }));
  }
     if(name === 'receipt') {
      setReceipt(value);
      setErrors((prevErrors) => ({ ...prevErrors, receipt: '' }));
     }
     if(name === 'amount') {
      setAmount(value);
      setErrors((prevErrors) => ({ ...prevErrors, amount: '' }));
     }
     if(name === 'studentname') {
      setStudentName(value);
      setErrors((prevErrors) => ({ ...prevErrors, studentname: '' })); 
     }
     if(name === 'paymentmethod') {
      setPaymentMethod(value);
      setErrors((prevErrors) => ({ ...prevErrors, paymentmethod: '' }));
     }
     if(name === 'paymentid') {
      setPaymentId(value);
      setErrors((prevErrors) => ({ ...prevErrors, paymentid: '' }));
     }

     if(name === 'date') {
      setDate(value);
      setErrors((prevErrors) => ({ ...prevErrors, date: '' }));
     }
     if(name === 'addedby') {
      setAddedby(value);
      setErrors((prevErrors) => ({ ...prevErrors, addedby: '' }));
     }
  setFees({...fees,[e.target.name]:e.target.value});
    console.log(fees); 
  };

  const validationForm =(feesDetails)=>{ 
    const errors={};
    if (!/[A-Za-z]+(?:[-' ][A-Za-z]+)/.test(feesDetails.studentname)) {
      errors.studentname = "Name sould  be in the format of 'Rishabh Kumar'";
  }
  if (!/\d+\.\d{2}/.test(feesDetails.amount)) {
    errors.amount = "Requires exactly two decimal places (eg.5000.00)";
  }
  if (!/[A-Z]{3}[0-9]{6}/.test(feesDetails.paymentid)) {
    errors.paymentid = "It should have 3 uppercase letters followed by 6 digits(eg:ABC202300)";
  }
  if (!/[0-9]{6}/.test(feesDetails.enroll_id)) {
    errors.enroll_id = "enrollment id should  allows exactly 6 digit number(eg:852369)";
}
if (!/[0-9]{6}/.test(feesDetails.receipt)) {
  errors.receipt = "receipt allows exactly 6 digit nunber";
}
if(!feesDetails.addedby || feesDetails.addedby.length ===0){
  errors.addedby="Please Select the at least one option"
}
if(!feesDetails.paymentmethod || feesDetails.paymentmethod.length ===0){
      errors.paymentmethod="Please Select the at least one paymentmethod"
        }
    return errors;
  };

  const editFeesDetails= (e)=>{
    e.preventDefault();
    const newErrors=validationForm(fees); 
    setErrors(newErrors); 
    if(Object.keys(newErrors).length===0){
 try{
    dispatch(editFees({id,editFees:fees}));
    toast.success("Fees details add successfully")
    navigate('/dashboard/fees');
    // setClicked(true);

  }catch(error){
 toast.success("Some error in fees deatails")
  }
}
  else{
    alert("Fees details are invalid");
  } 
  };

  // pop
  const [isFormVisible, setIsFormVisible] = useState(true); // Form visibility state
  const handleClose = () => {
    setIsFormVisible(false); // Hide the form when the close button is clicked
    navigate('/dashboard/fees')
  };

  return (
    <div>
         <Toaster/>
        <div  style={{margin:"10px", padding:"5px",border:"1px solid #DEDEDE"}}>
        {isFormVisible &&(
    <form className="edit-form" >
      <h1 className="form-title">Update Installment</h1>

      <div className="form-group">
        <label>Entrollment Id:</label>
        <input className="form-input" name="enroll_id" value={fees.enroll_id} onChange={(e) => {const value = e.target.value;
    // Ensure the prefix 'EN' remains at the start
            const updatedValue = value.startsWith('EN') ? value : 'EN' + value.replace(/^EN/, '');
                onValueChange({ target: { name: 'enroll_id', value: updatedValue } });
            }} placeholder='Enrollment ID'/>
             {errors.enroll_id && (<span className="error-message"> {errors.enroll_id}</span>)}
      </div>

      <div className="form-group">
        <label>Receipt:</label>
        <input className="form-input" name="receipt" value={fees.receipt} onChange={(e) => {const value = e.target.value;
            const updatedValue = value.startsWith('R') ? value : 'R' + value.replace(/^R/, '');
                onValueChange({ target: { name: 'receipt', value: updatedValue } });
            }} placeholder='Recipt No'/>
              {errors.receipt && (<span className="error-message"> {errors.receipt}</span>)}
      </div>

      <div className="form-group">
  <label>Student:</label>
  <input   className="form-input" name="studentname"  onChange={(e)=>onValueChange(e)}  style={{ border: 'none', outline: 'none',borderRadius:"10px",backgroundColor:"#DEDEDE" }}  value={fees.studentname}>
  </input>
  {errors.studentname && (<span className="error-message"> {errors.studentname}</span>)}
</div>

<div className="form-group">
  <label>Amount Pay:</label>
  <input className="form-input" name="amount" onChange={(e)=>onValueChange(e)} placeholder='Amount' value={fees.amount}/>
  {errors.amount && (<span className="error-message"> {errors.amount}</span>)}
</div>

<div className="form-group">
      <label>Date and Time:</label>
      <input className="form-input" name="date" type="date" onChange={(e) => onValueChange(e)} value={fees.date}/>
    </div>

<div className="form-group">
  <label>Payment Method:</label>
  <select   className="form-input"  name="paymentmethod"  onChange={(e)=>onValueChange(e)} value={fees.paymentmethod}>
      <option>Select Payment Method</option>
      <option >Cash</option>
      <option >Cheque</option>
      <option>Card</option>
      <option>Bank Transfer</option>
      <option>Demand Draft</option>
  </select>
  {errors.paymentmethod && (<span className="error-message"> {errors.paymentmethod}</span>)}
</div>

<div className="form-group">
  <label>Transaction/Payment ID:</label>
  <input className="form-input" name="paymentid" onChange={(e)=>onValueChange(e)} placeholder='Transction/ Payment ID' value={fees.paymentid} />
  {errors.paymentid && (<span className="error-message"> {errors.paymentid}</span>)}
</div> 

<div className="form-group">
        <label>Added  By:</label>
        <select className="form-input" name="addedby" onChange={(e)=>onValueChange(e)} placeholder='Added By' value={fees.addedby}>
        <option>---Select---</option>
          <option>User</option>
          <option>Admin</option>
          {errors.addedby && (<span className="error-message"> {errors.addedby}</span>)}
        </select> 
      </div>
      <DialogActions>
    {/* Button to close the dialog */}
    <Button type="submit" variant="contained" color="primary" className="btn-submit"  onClick={editFeesDetails} 
    //  style ={{
    //   backgroundColor: enroll_id && receipt &&  studentname && amount &&  date && paymentmethod && paymentid && addedby ? "green" :"gray",
    //   cursor: enroll_id && receipt &&  studentname && amount &&  date && paymentmethod && paymentid && addedby ? "pointer":"not-allowed",
    //    }}
    //    disabled = {clicked || !(enroll_id && receipt &&  studentname && amount &&  date && paymentmethod && paymentid && addedby)}
    > Update Installment </Button>
    <Button  onClick={handleClose} variant="contained" style={{backgroundColor:'red',color:'white'}}>Close</Button>
  </DialogActions>
    </form>
        )}
    </div>
</div>
  )
}
export default FeesEdit