import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { addUser, loginUser } from '../services/SignupSlice';
import "../style/style.css";

const initialValue = {
  uname:'',
  email:'',
  password:''

}

function Home() {


  const [formData, setFormData] =  useState(initialValue)
  const dispatch = useDispatch();
  const [errors,setErrors] = useState({})

  const[email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  let navigate = useNavigate()

  const [show, setShow] = useState(false);
  const [showsignup, setShowSignup] = useState(false);
  const [reset, setReset] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShowSignup(false);
  const handleShow1 = () => setShowSignup(true);

  const handleClose2 = () => setReset(false);
  const handleShow2 = () => setReset(true);



  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 4; // Total number 


  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
  
      setCurrentIndex(totalSlides - 1);
    }
  };

  // Handle Next button click
  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };


  const onValueChange = (e)=>{
  //  console.log(e.target.value) 
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
    }
    else{
    toast.error("Please Enter data in proper format")
    }


  }



  const ValidateForm = (data) =>{

   const errors ={}

   if(!data.uname){
    errors.uname = "Please enter username"
   }

   if(!data.email){
    errors.email = "Please enter email"
   }else if(!/^[\w.-]+@[\w-]+\.[\w.-]{2,4}$/.test(data.email)){
    errors.email = "Enter email in abcd12@gmail.com format"
   }

   if(!data.password){
    errors.password = "Please enter password"
   } else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(data.password)){
    errors.password ="enter password in Testing193! format"
   }

   return errors
  }


  //Login

  const handleLogin = async(e) =>{
    e.preventDefault()


    // const loginError  = LoginValidate(formData)
    // setErrors(loginError)

    // if(Object.keys(loginError).length === 0){
      const result = await dispatch(loginUser({email,password}) )

      localStorage.setItem('username', JSON.stringify(result))
     
      // console.log(result)
      if(result.payload && result.payload.success){
        setTimeout(()=>{
          navigate("/dashboard")
        },2000)
         toast.success("Login Successful")
      }else{
       toast.error("enter correct email & password ")
      }
    // }

    
}



// const LoginValidate = ()=>{
//   let errors = {}
//   if(!email){
//     errors.email ="please enter email"
//   }

//   if(!password){
//     errors.password =" please enter password "
//   }

//   return errors
//  }

         //reset password




 
  return (
    <>
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand><h2 className='classrrom'>Classroom</h2></Navbar.Brand>
      
     
          <button className='login_btn' onClick={handleShow}>Login</button>
  
      </Container>
    </Navbar>

    <Carousel id="carouselExample" indicators={false} controls={false} className='container' interval={10000000000}  >
      <Carousel.Item>
        <div className="row d-flex align-items-center all_item mb-3 ">
          <div className="col-lg-6 col-md-12 col-sm-12 text-center text-lg-start " >
            <h3 className='heading3'>Welcome to</h3>
            <h1 className='heading1'>Digital Classroom</h1>
            <p className='para1'>Our state-of-the-art learning management portal</p>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 text-center">
            <img
              className="w-100"
              src="https://classroom.edyoda.com/static/media/Slide03-Gamified-Learning.86ddf67c.png"
              alt="First slide"
            />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="row d-flex align-items-center all_item mb-3">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <h1 className='heading1'>Student Community</h1>
            <p className='para1'>Be a part of EdYoda Student Community and stay connected with your classmates and EdYoda Alumnus.</p>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 text-center">
            <img
              className="w-100"
              src="https://classroom.edyoda.com/static/media/Slide04-Student-Community.69317132.png"
              alt="Second slide"
            />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="row d-flex align-items-center all_item mb-3">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <h1 className='heading1'>24 x 7 Student Support</h1>
            <p className='para1'>Get round the clock support from our Support Team.</p>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 text-center">
            <img
              className="w-100"
              src="https://classroom.edyoda.com/static/media/Slide06-Support.7b41b5ca.png"
              alt="Third slide"
            />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="row d-flex align-items-center all_item mb-3">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <h1 className='heading2'>Instructor-led Live Sessions</h1>
            <p className='para1'>Get access to instructor-led live sessions and live doubts clearing sessions.</p>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 text-center">
            <img
              className="w-100"
              src="https://classroom.edyoda.com/static/media/Slide02-Live-Session.ba407834.png"
              alt="Fourth slide"
            />
          </div>
        </div>
      </Carousel.Item>

      <span className="custom-controls container" >
  {/* Custom previous button */}

  
  <button className={"custom-prev " + (currentIndex === 0 ? 'opacity-25' : 'opacity-100, ')}
 type="button" data-bs-target="#carouselExample" data-bs-slide="prev"
           onClick={handlePrev}
           disabled ={ currentIndex === 0 }
  >
    <span aria-hidden="true">
      <ArrowCircleLeftOutlinedIcon style={{ fontSize: "20px", marginBottom: "2px" }} /> PREVIOUS
    </span>
  </button>

  {/* Custom indicators */}
  <div className="carousel-indicators custom-indicators" >
    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className={currentIndex === 0 ? 'active' : ''}  aria-current="true" style={{ backgroundColor: "gray", height: "10px", width: "10px", borderRadius: "50%",marginLeft:"40px" }}></button>
    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" className={currentIndex === 1 ? 'active' : ''} style={{ backgroundColor: "gray", height: "10px", width: "10px", borderRadius: "50%" }}></button>
    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" className={currentIndex === 2 ? 'active' : ''} style={{ backgroundColor: "gray", height: "10px", width: "10px", borderRadius: "50%" }}></button>
    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3" className={currentIndex === 3 ? 'active' : ''} style={{ backgroundColor: "gray", height: "10px", width: "10px", borderRadius: "50%" }}></button>
  </div>

  {/* Custom next button */}
  <button className={
  "custom-next " +  (currentIndex === totalSlides - 1 ? ' opacity-25 cursor-not-allowed' : 'opacity-100 cursor-pointer')}

type="button" data-bs-target="#carouselExample" data-bs-slide="next"
  onClick={handleNext}
  disabled={currentIndex === totalSlides - 1}
  >
    <span aria-hidden="true">
      NEXT <ArrowCircleRightOutlinedIcon style={{ fontSize: "20px", marginBottom: "2px" }} />
    </span>
  </button>
</span>
</Carousel>

<div style={{display:"flex", justifyContent:"space-between"}} className='container'>
  <div className='row'>

<div className='col-md-12'>

</div>
  <h5 style={{color:"gray"}}>Get in touch</h5>
    <ul style={{display:"flex", justifyContent:"center",alignItems:"center",cursor:"pointer"}} type='none' className="social_icons"> 


 <Link to='https://api.whatsapp.com/send?phone=918263926309&text=Hi%20I%20would%20like%20to%20get%20more%20information%20about%20the%20courses...' target='_blank'><li><WhatsAppIcon/></li></Link> 
 <Link to='' target='_blank'><li><TwitterIcon/></li></Link> 
 <Link to='https://www.facebook.com/hematite.infotech/' target='_blank'><li><FacebookIcon/></li></Link> 
 <Link to='https://www.instagram.com/hematite_infotech/?igsh=ZDE3OTNnNzdjNnl4' target='_blank'> <li><InstagramIcon/></li></Link>
</ul>
    
  </div>
  <div >
  <p style={{color:"gray" , marginTop:"10px"}}>@2024 Classroom Online University </p>
  <button  className='login_btn' onClick={handleShow} >Login</button>
  <button className='login_btn' onClick={handleShow1} style={{marginLeft:"15px"}}>Signup</button>
  </div>
</div>

  
  
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
                placeholder="enter email "
               style={{padding:"10px"}}
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
              />
              {/* { errors.email && <span style={{color:"red"}}>{errors.email}</span>} */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password <span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                style={{padding:"10px"}}
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
              />
              {/* {errors.password && <span style={{color:"red"}}>{errors.password}</span>} */}
            </Form.Group>

            <button className='login_btn'>Log In</button>
            <p className='signup_btn'>Don't have an account? <Link  
            onClick={() => {
              handleShow1();  // Open the Sign-Up modal
              handleClose();  // Close the Login modal
          }}
          >Sign-Up</Link> </p>
            <p className='signup_btn'>Forgot your password? <Link onClick={setReset}>RESET PASSWORD</Link> </p>
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
              />
                {errors.password && <span style={{color:"red"}}>{errors.password}</span> }
            </Form.Group>

            <button className='login_btn' onClick={AddUserDetail}>Sign-Up</button>
            <p className='signup_btn'>Already have an account? <Link 
            onClick={() => {
              handleShow();  // Open the Login modal
              handleClose1();  // Close the Sign-Up modal
          }}
            >Sign-In</Link> </p>
          </Form>
        </Modal.Body>
      </Modal>


      <Modal show={reset} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
         
        </Modal.Header>
        <p style={{color:"gray", marginLeft:"10px", marginBottom:"-10px"}}>enter your registerd email</p>
        <Modal.Body>
          <Form> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            
              <Form.Label>Email <span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email "
               style={{padding:"10px",outline:"none"}}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password <span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                style={{padding:"10px"}}
               
              />
            </Form.Group>

            <button className='reset_btn' >Reset Password</button>
          </Form>
        </Modal.Body>
      </Modal>
    

    

    
    </>
  );
}

export default Home;
