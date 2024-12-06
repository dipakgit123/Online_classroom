
import Slider from "./Slider";
import Footer from "./Footer";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { addUser, loginUser } from '../../services/SignupSlice';
import "../../style/style.css";

const initialValue = {
    uname:'',
    email:'',
    password:'',
    phone:"",
    city:''
  
  }
  

function Home(){

    
  const [formData, setFormData] =  useState(initialValue)
  const dispatch = useDispatch();
  const [errors,setErrors] = useState({})

  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [clicked, setClicked] = useState(false); 

  
 
  let navigate = useNavigate()

  const [show, setShow] = useState(false);
  const [showsignup, setShowSignup] = useState(false);

  const handleClose = () =>{ 
    setShow(false)
    setError1(" ")
};
  
  const handleShow = () => setShow(true);

  const handleClose1 = () => { 
    setShowSignup(false)
    setErrors(" ")
};
  const handleShow1 = () => setShowSignup(true);






  const onValueChange = (e)=>{
  //  console.log(e.target.value) 
  const { name, value } = e.target;
  if (name === 'uname') setUname(value);
  if (name === 'email') setEmail(value);
  if (name === 'password') setPassword(value);
  if (name === 'phone') setPhone(value);
  if (name === 'city') setCity(value);


  setFormData({...formData, [e.target.name]:e.target.value})

  


  // console.log(formData)
  }

  const AddUserDetail = async(e) =>{

     e.preventDefault()
    const newErrors = ValidateForm(formData)
    setErrors(newErrors)

    if(Object.keys(newErrors).length === 0){
    
    let res = dispatch(addUser(formData))
    localStorage.setItem('username', JSON.stringify(res));

    toast.success("Sign-up Successfully")
    setClicked(true)
    setShowSignup(false)
    }
    else{
    toast.error("Please Enter data in proper format")
    }

    

  }



  const ValidateForm = (data) =>{

   let errors ={}

   if (!data.uname) {
    errors.uname = "Please enter username";
  } else if (/\d/.test(data.uname) || /\s/.test(data.uname)) {
    errors.uname = "Username cannot contain spaces or numbers";
  }
  
  if (!data.email) {
    errors.email = "Please enter email";
  } else if (!/^[\w.-]+@[\w-]+\.(com|in)$/.test(data.email)) {
    errors.email = "Enter email in abcd12@gmail.com  format or  in abcd12@gmail.in";
  }
  
  if (!data.password) {
    errors.password = "Please enter password";
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(data.password)) {
    errors.password = "Enter password in Testing193! format";
  }

  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (/\D/.test(phone)) {
    errors.phone = 'Phone number must contain only digits.';
  } else if (/\s/.test(phone)) {
    errors.phone = 'Phone number must not contain spaces.';
  } else if (/[!@#$%^&*(),.?":{}|<>]/.test(phone)) {
    errors.phone= 'Phone number must not contain special characters.';
  } else if (phone.length !== 10) {
    errors.phone = 'Phone number must be exactly 10 digits.';
  }

  
  if (!data.city) {
    errors.city = "Please enter city";
  } else if (/\d/.test(data.city) ||  /\s/.test(data.city)  || /[!@#$%^&*(),.?":{}|<>]/.test(data.city)) {
    errors.city = "City cannot contain numbers or special characters";
  }
   return errors
  }

  const handleBlur1 = (e) => {
    const { name, value } = e.target;
  
    const errorMessages = ValidateForm({ ...formData, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessages[name],
    }));
  };


    
  //Login

  const [error1, setError1] = useState("")
  // let loginCode = JSON.parse(localStorage.getItem('login-code'))

  const handleLogin = async(e) =>{
    e.preventDefault()

   

    const loginError  = LoginValidate(formData)
    setError1(loginError)

    if(Object.keys(loginError).length === 0){
      const result = await dispatch(loginUser({email,password}) )

      // console.log(result)

     const user = result?.payload?.signup?.find(user => user.email === email);
     localStorage?.setItem('username', JSON?.stringify(user?.uname))
    
      if(result?.payload && result?.payload?.success){
        
        setTimeout(()=>{
          navigate("/dashboard")
        },2000)
         toast.success("Login Successful")
      }else{
       toast.error("incorrect email or password")
      }
    }

    
}



const LoginValidate = ()=>{
  let error1 = {}
  if(!email){
    error1.email ="please enter email"
  } else if (!/^[\w.-]+@[\w-]+\.(com|in)$/.test(email)) {
    errors.email = "Enter email in abcd12@gmail.com or in abcd12@gmail.com format";
  }

  if(!password){
    error1.password =" please enter password "
  }else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
    errors.password = "Enter password in Testing193! format";
  }
  //  if(!loginCode){
  //   error1.loginCode =" please enter login code "
  //  }

  return error1
 }

 const handleBlur = (e) => {
  const { name, value } = e.target;

  const errorMessages = LoginValidate({ ...formData, [name]: value });
  setError1((prevErrors) => ({
    ...prevErrors,
    [name]: errorMessages[name],
  }));
};
 
    
    return(
        <>
         <Navbar expand="lg">
      <Container>
        <Navbar.Brand><h2 className='classrrom'>Hematite Infotech</h2></Navbar.Brand>
      
     
        <div className="button-group">
      <button className='login_btn' onClick={handleShow}>Login</button>
      <button className='login_btn' onClick={handleShow1}>Signup</button>
    </div>
  
      </Container>
    </Navbar>

   <Slider/>
   <Footer/>

   <Toaster/>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email <span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="email"
                name='email'
                placeholder="enter email "
               style={{padding:"10px"}}
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
               onBlur={handleBlur}
              />
              { error1.email && <span style={{color:"red"}}>{error1.email}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password <span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="password"
                name='password'
                placeholder="enter password"
                style={{padding:"10px"}}
                value={password}
               onChange={(e)=>setPassword(e.target.value)}
               onBlur={handleBlur}
              />
              {error1.password && <span style={{color:"red"}}>{error1.password}</span>}
            </Form.Group>

            <button className='login_btn'
             style={{
              // Disable the link if fields are empty
              color: email && password ? "white" : "gray", 
              cursor: email && password ? "pointer" : "not-allowed",  // Change color to gray when disabled
            }}
            disabled={clicked || !(email && password)} 
            >Log In</button>
            <p className='signup_btn'>Don't have an account? <Link  
            onClick={() => {
              handleShow1();  // Open the Sign-Up modal
              handleClose();  // Close the Login modal
          }}
          
          >Sign-Up</Link> </p>
          </Form>
        </Modal.Body>
      </Modal>



      <Modal show={showsignup} onHide={handleClose1} 
       >
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            
            <Form.Label>Username <span style={{color:"red"}}>*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="type your name "
             style={{padding:"10px"}}
             name='uname'
             onChange={(e)=>onValueChange(e)}
             onBlur={handleBlur1}
            />
            {errors.uname && <span style={{color:"red"}}>{errors.uname}</span> }
          </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            
              <Form.Label>Email <span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email "
               style={{padding:"10px"}}
               name='email'
               onChange={(e)=>onValueChange(e)}
               onBlur={handleBlur1}
              />
                {errors.email && <span style={{color:"red"}}>{errors.email}</span> }
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password <span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                style={{padding:"10px"}}
                name='password'
                onChange={(e)=>onValueChange(e)}
                onBlur={handleBlur1}
              />
                {errors.password && <span style={{color:"red"}}>{errors.password}</span> }
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile No <span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="enter mobile no"
                style={{padding:"10px"}}
                name='phone'
                onChange={(e)=>onValueChange(e)}
                onBlur={handleBlur1}
              />
                {errors.phone && <span style={{color:"red"}}>{errors.phone}</span> }
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City<span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="enter city"
                style={{padding:"10px"}}
                name='city'
                onChange={(e)=>onValueChange(e)}
                onBlur={handleBlur1}
              />
                {errors.city && <span style={{color:"red"}}>{errors.city}</span> }
            </Form.Group>

            <button className='login_btn' onClick={AddUserDetail}
             style={{
              color: uname && email && password && phone && city ? "white" : "gray", // Enable button if all fields are filled
              cursor: uname && email && password && phone && city ? "pointer" : "not-allowed", // Change cursor to indicate disabled button
            }}
            disabled={clicked || !(email && password && uname && phone && city)} 
            >Sign-Up</button>
            <p className='signup_btn'>Already have an account? <Link 
            onClick={() => {
              handleShow();  // Open the Login modal
              handleClose1();  // Close the Sign-Up modal
          }}
            >Sign-In</Link> </p>
          </Form>
        </Modal.Body>
      </Modal>


        </>
    )
}

export default Home;