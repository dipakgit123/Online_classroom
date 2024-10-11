import  React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentsIcon from '@mui/icons-material/Payments';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportIcon from '@mui/icons-material/Report';
import PersonIcon from '@mui/icons-material/Person';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

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




function Dashboard() {
  return (
    
    <AppProvider 
      navigation={NAVIGATION}
      branding={{
        logo: <PersonIcon style={{color:'blue',fontSize:'32px',position:'absolute',left:'1380px',margin:'auto'  }}/>,
        title:<span style={{visibility:'hidden'}}>Hello</span>,
      }}>
      <DashboardLayout>
      </DashboardLayout>
    </AppProvider>
  );
}
export default Dashboard;