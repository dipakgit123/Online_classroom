import  React, { useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentsIcon from '@mui/icons-material/Payments';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportIcon from '@mui/icons-material/Report';
import PersonIcon from '@mui/icons-material/Person';
import {Select,MenuItem} from '@mui/material'
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast"

const NAVIGATION = [
  {
    kind: 'header',
    title: 'My Dashboard',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'courses',
    title: 'Courses',
    icon: <ImportContactsIcon />,
  },
  {
    segment: 'batches',
    title: 'Batches',
    icon: <BatchPredictionIcon />,
  },
  {
    segment: 'enquiries',
    title: 'Enquiries',
    icon: < PhoneIcon/>,
  },
  {
    segment: 'students',
    title: 'Students',
    icon: <PersonIcon />,
  },
  {
    segment: 'fees',
    title: 'Fees',
    icon: <PaymentsIcon />,
  },
  
  {
    segment: 'exam results',
    title: 'Exam Results',
    icon: <DescriptionIcon />,
  },
  
  {
    segment: 'report',
    title: 'Report',
    icon: <ReportIcon />,
  }
];



// console.log(userss.payload.user.uname)

function Dashboard() {
  
  let userss = JSON.parse(localStorage.getItem('username'))
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!userss) {
        alert("Please log in first."); // Display error if no user is logged in
        navigate("/"); // Redirect to login page
    }
}, [navigate, userss]);

const LogOut = () => {
    localStorage.clear();
    navigate("/"); // Redirects to the home page
}

if (!userss) {
    return null; // Prevents rendering the dashboard content if the user is not logged in
}
  

  return (
    
    <AppProvider 
      navigation={NAVIGATION}
      branding={{
        logo: <Select><MenuItem onClick={LogOut}>Logout</MenuItem></Select>  ,
        title:<span style={{visibility:'hidden'}}>Hello</span>,
      }}>
      <DashboardLayout>
     { userss.payload.user.uname  &&  <p>{userss.payload.user.uname}</p> }
      </DashboardLayout>
    </AppProvider>
  );
}
export default Dashboard;