import { useState } from 'react'; 
import Carousel from 'react-bootstrap/Carousel';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Slider1 from "../../asset/images/slider1.png"
import Slider2 from "../../asset/images/slider2.png"
import Slider3 from "../../asset/images/slider3.png"
import Slider4 from "../../asset/images/slider4.png"

const SliderData = [{

    id:1,
    heading :"Digital Classroom",
    desc:"Our state-of-the-art learning management portal",
    images:Slider3,
    alt:"slider1"
},
{
    id:2,
    heading:"Student Community",
    desc:"Be a part of EdYoda Student Community and stay connected with your classmates and EdYoda Alumnus.",
    images:Slider1,
    alt:"slider2"
},

{
    id:3,
    heading:"24 x 7 Student Support",
    desc:"Get round the clock support from our Support Team.",
    images:Slider2,
    alt:"slider3"

},
{
    id:4,
    heading:"Instructor-led Live Sessions",
    desc:"Get access to instructor-led live sessions and live doubts clearing sessions.",
    images:Slider4,
    alt:"slider4"
}
]

const Slider = () => {

    
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
    <div>
         <Carousel id="carouselExample" indicators={false} controls={false} className='container' interval={null}  >
            { SliderData.map((item)=>(
                  <Carousel.Item >
        <div className="row d-flex align-items-center all_item mb-3 ">
          <div className="col-lg-6 col-md-12 col-sm-12 text-center text-lg-start " >
            <h3 className='heading3'>Welcome to</h3>
            <h1 className='heading1'>{item.heading}</h1>
            <p className='para1'>{item.desc}</p>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 text-center">
            <img
              className="w-100"
              src={item.images}
              alt={item.alt}
            />
          </div>
        </div>
      </Carousel.Item>
            ))
            }
      

   

      

     

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

      
    </div>
  )
}

export default Slider
