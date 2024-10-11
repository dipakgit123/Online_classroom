import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import "../style/style.css";

function Home() {

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


 
  return (
    <>
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand><h2 className='classrrom'>Classroom</h2></Navbar.Brand>
      
     
          <button className='login_btn'>Login</button>
  
      </Container>
    </Navbar>

    <Carousel id="carouselExample" indicators={false} controls={false} className='container'>
      <Carousel.Item>
        <div className="row d-flex align-items-center all_item mb-3 ">
          <div className="col-lg-6 col-md-12 col-sm-12 text-center text-lg-start">
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


  <li><WhatsAppIcon/></li>
  <li><TwitterIcon/></li>
  <li><FacebookIcon/></li>
  <li><InstagramIcon/></li>
</ul>
    
  </div>
  <div >
  <p style={{color:"gray" , marginTop:"10px"}}>@2024 Classroom Online University </p>
  </div>
</div>

  
  
  
  
    

    

    
    </>
  );
}

export default Home;
