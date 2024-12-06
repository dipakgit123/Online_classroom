import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addFees, allFees, deleteFees } from '../services/apiFeesSlice';


const Fees =()=>{
  const { data } = useSelector((state) => state.fees); // Get exam list from Redux state
  const [entriesToShow, setEntriesToShow] = useState(5);
  const[currentPage, setCurrentPage]=useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const fee =useSelector((state)=>state.fees.data);
  const status=useSelector((state)=>state.fees.status);
  const dispatch = useDispatch();
    useEffect(()=>{
      if(status ==='idle'){
        dispatch(allFees());
      }
    }, [status,dispatch]);

//search term
const lowercasedSearchTerm = searchTerm?.toLowerCase() || ''; // Handle undefined or null search term
const filteredFees = data.filter((fees) => {
  // Convert student fields to lowercase for case-insensitive matching
  const feesReceipt = fees.receipt && typeof fees.receipt === 'string' ? fees.receipt.toLowerCase() : '';
  const feesAmount= fees.amount && typeof fees.amount === 'string' ? fees.amount.toLowerCase() : '';
  const feesEnrollmentID = fees.enroll_id && typeof fees.enroll_id === 'string' ? fees.enroll_id.toLowerCase() : '';
  const feesStudentName = fees.feesname && typeof fees.feesname === 'string' ? fees.feesname.toLowerCase() : '';
  const feesPaymentMethod = fees.paymentmethod && typeof fees.paymentmethod === 'string' ? fees.paymentmethod.toLowerCase() : '';
  const feesPaymentId = fees.paymentid && typeof fees.paymentid === 'string' ? fees.paymentid.toLowerCase() : '';
  const feesDate = fees.date && typeof fees.date === 'string' ? fees.date.toLowerCase() : '';
  const feesAddedBy = fees.addedby && typeof fees.addedby === 'string' ? fees.addedby.toLowerCase() : '';

  return (
    feesReceipt.includes(lowercasedSearchTerm) ||
    feesAmount.includes(lowercasedSearchTerm) ||
    feesEnrollmentID.includes(lowercasedSearchTerm) ||
    feesStudentName.includes(lowercasedSearchTerm) ||
    feesPaymentMethod.includes(lowercasedSearchTerm)||
    feesPaymentId.includes(lowercasedSearchTerm)||
    feesDate.includes(lowercasedSearchTerm) ||
    feesAddedBy.includes(lowercasedSearchTerm)
  );
});



//pagination 
  // Calculate total pages based on the selected entries per page
  const totalPages = Math.ceil(filteredFees.length / entriesToShow);
  // Get the current fees for the current page
  const indexOfLastFees = currentPage * entriesToShow;
  const indexOfFirstFees = indexOfLastFees - entriesToShow;
  const currentFees = filteredFees.slice(indexOfFirstFees, indexOfLastFees);
  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  // Handle the change in number of entries to show per page
  const handleEntriesToShowChange = (e) => {
    setEntriesToShow(Number(e.target.value));  // Update entriesToShow
    setCurrentPage(1);  // Reset to first page when changing the number of entries
  };


  //pop 
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const [fees, setFees]=useState(initialValue);
  const [errors, setErrors]=useState({});
  const navigate = useNavigate();

  const[receipt, setReceipt]=useState("");
  const[amount, setAmount] = useState("");
  const[enroll_id, setEnroll_id] = useState("");
  const[studentname, setStudentName] = useState("");
  const [paymentmethod, setPaymentMethod] = useState("");
  const [paymentid, setPaymentId] = useState("")
  const[date, setDate] = useState("");
  const[addedby, setAddedby] = useState("");
  const[clicked, setClicked] = useState(false);


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
  }

  const validationForm =(feesDetails)=>{ 
    const errors={};
    if (!/[A-Za-z]+(?:[-' ][A-Za-z]+)/.test(feesDetails.studentname)) {
      errors.studentname = "Name should  be in the format of 'Rishabh Kumar'";
  }

  if (!/[0-9]{6}/.test(feesDetails.enroll_id)) {
    errors.enroll_id = "enrollment id should  allows exactly 6 digit number(eg:852369)";
}

if (!/[0-9]{6}/.test(feesDetails.receipt)) {
  errors.receipt = "receipt allows exactly 6 digit nunber";
}

if (!/[A-Z]{3}[0-9]{6}/.test(feesDetails.paymentid)) {
  errors.paymentid = "It should have 3 uppercase letters followed by 6 digits for eg:(ABC202300)";
}

if (!/\d+\.\d{2}/.test(feesDetails.amount)) {
  errors.amount = "Requires exactly two decimal places (eg.5000.00)";
}
if (!/\d{4}-\d{2}-\d{2}/.test(feesDetails.date)) {
  errors.date = "Invalid date format. Please use YYYY-MM-DD";
}

if(!feesDetails.addedby || feesDetails.addedby.length ===0){
  errors.paymentmethod="Please Select the at least one option"
}

if(!feesDetails.paymentmethod || feesDetails.paymentmethod.length ===0){
errors.paymentmethod="Please Select the at least one paymentmethod"
}
    return errors;
  }

  const addFeesDetails= async(e)=>{
    e.preventDefault();
    const newErrors=validationForm(fees);
    setErrors(newErrors)

    if(Object.keys(newErrors).length===0){
      dispatch(addFees(fees));
    toast.success("Fess details added successfully")
    navigate('/dashboard/fees');
    setOpen(false); 
    setClicked(true);
  }else{
  toast.error("Fail due to fees details is invalid");
  }
    }

  return (
    <>
  <div style={{ marginTop:'20px', textAlign:'center'}}> 
    <h1 style={{ fontSize: '36px', color: '#333',textAlign: 'center' }}>
          <AttachMoneyIcon style={{marginRight:'10px',fontSize:'40px'}}></AttachMoneyIcon>Fees</h1>
          <div style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724', padding: '15px', fontSize: '16px', borderRadius: '4px',
            marginBottom: '20px',width: 'auto', margin: '0 auto',}} >
          Here, you can find installments or add a new installment.
        </div>

        <div
          style={{ maxWidth: 'auto',  margin: '0 auto', borderRadius: '4px', border: '1px solid #DEDEDE', 
            padding: '15px', marginTop: '20px'}}>

          <div style={{ backgroundColor:"#F6F6F6",color: '#000',padding: '15px', fontSize: '18px', textAlign: 'left', borderRadius: '4px',marginBottom: '20px',
              border: '1px solid white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }} ><strong>Manage Fees</strong> 

            <button style={{color: 'blue',padding: '10px 20px', border: '1px solid blue', borderRadius: '4px', fontSize: '16px',
                cursor: 'pointer', }} onClick={handleClickOpen}>
             + Add New Installment
            </button>
          </div>

          {/* add new fees form */}
            <Dialog open={open} onClose={handleClose} style={{margin:"10px", padding:"5px",border:"1px solid #DEDEDE"}}>
            <CloseOutlinedIcon  style={{ position: 'absolute', right: '5px',color: 'gray' ,top:"5px" ,cursor:'pointer'}}
            onClick={handleClose} /> 
          <form  className="edit-form" style={{margin:'30px 30px'}}>   
            <h1 className="form-title">Add New Installment</h1>

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
        <input   className="form-input"  name="studentname"  onChange={(e)=>onValueChange(e)}  style={{ border: 'none', outline: 'none',borderRadius:"10px",backgroundColor:"#DEDEDE" }}>  
        </input>
        {errors.studentname && (<span className="error-message"> {errors.studentname}</span>)}
      </div>

      <div className="form-group">
        <label>Amount Pay:</label>
        <input className="form-input" name="amount" onChange={(e)=>onValueChange(e)} placeholder='Amount'/>
        {errors.amount && (<span className="error-message"> {errors.amount}</span>)}
      </div>


      <div className="form-group">
      <label>Date:</label>
      <input className="form-input" name="date" type="date" onChange={(e) => onValueChange(e)} placeholder='YYYY-MM-DD'/>
      {errors.date && (<span className="error-message"> {errors.date}</span>)}
    </div>

      <div className="form-group">
        <label>Payment Method:</label>
        <select className="form-input"  name="paymentmethod"  onChange={(e)=>onValueChange(e)}>
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
        <input className="form-input" name="paymentid" onChange={(e)=>onValueChange(e)} placeholder='Transction/ Payment ID'/>
        {errors.paymentid && (<span className="error-message"> {errors.paymentid}</span>)}
      </div>

      <div className="form-group">
        <label>Added  By:</label>
        <select className="form-input" name="addedby" onChange={(e)=>onValueChange(e)} placeholder='Added By'>
        <option>---Select---</option>
          <option>User</option>
          <option>Admin</option>
          {errors.addedby && (<span className="error-message"> {errors.addedby}</span>)}
        </select> 
      </div>

        <DialogActions>
        <Button type="submit" variant="contained" onClick={addFeesDetails}
        style ={{
          backgroundColor: enroll_id && receipt &&  studentname && amount &&  date && paymentmethod && paymentid && addedby ? "green" :"gray",
          cursor: enroll_id && receipt &&  studentname && amount &&  date && paymentmethod && paymentid && addedby ? "pointer":"not-allowed",
           }}
           disabled = {clicked || !(enroll_id && receipt &&  studentname && amount &&  date && paymentmethod && paymentid && addedby)}
        >Add New Installment</Button>
        <Button onClick={handleClose} variant="contained" style={{backgroundColor:'red',color:'white'}}>Cancel</Button>
        </DialogActions>
          </form>
          </Dialog>
           
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px'}}>Entries to show:</span>
              <select   value={entriesToShow} onChange={handleEntriesToShowChange} style={{ padding: '10px'}}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div> Search:
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px', width: '70%',display:'inline-block',marginLeft:'0.5em',borderRadius:'2px',height:"35px"}}/>
            </div>
          </div>
          
          

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <table style={{ borderCollapse: 'collapse', margin: '0 auto', width: '100%', border: '1px solid #ccc', }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid black',  padding: "4px 8px" }}>Receipt</th>
                  <th style={{ borderBottom: '1px solid black', borderLeft: '1px solid #DEDEDE',  padding: "4px 8px" }}>Amount</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE',  padding: "4px 8px" }}>Enrollment ID</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE',  padding: "4px 8px" }}>Student  Name</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE',  padding: "4px 8px" }}>Payment Method</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE',  padding: "4px 8px" }}>Payment Id</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE',  padding: "4px 8px" }}>Date</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE',  padding: "4px 8px" }}>Added By</th>
                  <th style={{ borderBottom: '1px solid black',borderLeft: '1px solid #DEDEDE',  padding: "4px 8px" }}>Action</th>

                </tr>
              </thead>
              <tbody>
                {currentFees.map((fees, index) => (<FeesRow key={index} fees={fees}/>))}
              </tbody>
            </table>
          </div>


  {/* Pagination controls */}
  <div style={{marginTop: '20px', display: 'flex', justifyContent: 'end', padding: '10px 10px',borderRadius: '10px'}}>
    {/* Previous button */}

    <Button variant="contained" color="default" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}
      style={{margin: '0 5px',fontSize: '12px',minWidth: '60px',padding: '6px 12px',borderRadius: '8px'}}>Previous</Button>
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


// ExamRow Component
const FeesRow = ({ fees }) => {
  
  const dispatch = useDispatch();  // to dispatch actions to Redux store
 
const deleteFeesData=(id)=>{
  dispatch(deleteFees(id));
}


  return (
    <>
    <Toaster/>
    <tr>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{fees.receipt}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{fees.amount}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{fees.enroll_id}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{fees.studentname}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{fees.paymentmethod}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{fees.paymentid}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>{fees.date}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8,}}>{fees.addedby}</td>
      <td style={{ border: '1px solid #DEDEDE', padding: 8 }}>   
      {/* Button to open the dialog */}
      <Link to={`/dashboard/editfees/${fees.id}`}  color="primary"  ><EditIcon /></Link>
          <Button style={{color:"red"}} onClick={()=>deleteFeesData(fees.id)} ><DeleteIcon /></Button>
        </td>
      </tr>



    </>
  );
};
export default Fees;