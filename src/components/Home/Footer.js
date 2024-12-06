
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link} from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between"}} className='container'>
  <div className='row'>

  <h5 style={{color:"gray"}}>Get in touch</h5>
    <ul style={{display:"flex", justifyContent:"center",alignItems:"center",cursor:"pointer"}} type='none' className="social_icons"> 


 <Link to='https://api.whatsapp.com/send?phone=918263926309&text=Hi%20I%20would%20like%20to%20get%20more%20information%20about%20the%20courses...' target='_blank'><li><WhatsAppIcon/></li></Link> 
 <Link to='' target='_blank'><li><TwitterIcon/></li></Link> 
 <Link to='https://www.facebook.com/hematite.infotech/' target='_blank'><li><FacebookIcon/></li></Link> 
 <Link to='https://www.instagram.com/hematite_infotech/?igsh=ZDE3OTNnNzdjNnl4' target='_blank'> <li><InstagramIcon/></li></Link>
</ul>
    
  </div>
  <div >
  <p style={{color:"gray" , marginTop:"10px"}}>@2024 hematite infotech  </p>
  </div>
</div>
    </div>
  )
}

export default Footer
