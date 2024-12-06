import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import ReportIcon from '@mui/icons-material/Report';
import { Button } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'My Dashboard',
  },
  {
    segment: 'pagedash',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    link:'/dashboard/pagedash'
  },
  {
    segment: 'courses',
    title: 'Courses',
    icon: <ImportContactsIcon />,
    link:'/dashboard/courses'
  },
  {
    segment: 'batch',
    title: 'Batches',
    icon: <BatchPredictionIcon />,
    link:'/dashboard/batch'
  },
  {
    segment: 'enqu',
    title: 'Enquiries',
    icon: < PhoneIcon/>,
    link:'/dashboard/enqu'
  },
  {
    segment: 'students',
    title: 'Students',
    icon: <PersonIcon />,
    link:'/dashboard/students'
  },
  {
    segment: 'fees',
    title: 'Fees',
    icon: <PaymentsIcon />,
    link:'/dashboard/fees'
  },
  
  {
    segment: 'examresult',
    title: 'Exam Results',
    icon: <DescriptionIcon/>,
    link:'/dashboard/examresult'
  },
  
  {
    segment: 'report',
    title: 'Report',
    icon: <ReportIcon />,
    link:'/dashboard/report'
  },
  {

  }
];





// console.log(userss.payload.user.uname)

function Dashboard() {

  const [pathname, setPathname] = useState('/dashboard')

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  
  
  let userss = JSON.parse(localStorage.getItem('username'))
  // console.log(userss);
  const navigate = useNavigate()
  
  useEffect(() => {
    if ( !userss) {
        alert("Please log in first."); // Display error if no user is logged in
        navigate("/"); // Redirect to login page
    }
}, [navigate, userss]);

const LogOut = () => {
 
  const isConfirmed = window.confirm("Are you sure?");

  if (isConfirmed) {
    localStorage.clear();
    navigate("/"); // Redirect to home page
  }
}

if (!userss) {
    return null; // Prevents rendering the dashboard content if the user is not logged in
}




// function RenderContent () {
//   // This will give you the `id` parameter from the URL (e.g., /editstudents/1)

//   const { id } = useParams();

//   switch (pathname) {
//     case '/pagedash':
//       return <PageDash />;
//     case '/courses':
//       return <Courses />;
//     case "/students":
//       return <Students />;
//     case "/fees":
//       return <Fees />;
//     case "/examresult":
//       return <ExamResult />;
//     case "/report":
//       return <Report />;
//     case "/enqu":
//       return <Enquiries />;
//     case "/batch":
//       return <Batches />;
//     case `/editstudents/${id}`: // Handle the dynamic route
//       return <EditStudents id={id} />;  // Pass the id to the EditStudents component
//     default:
//       return <PageDash />; // Default page if no match
//   }
// };



  return (
    <>
   
    <AppProvider 
      // navigation={NAVIGATION}
      // router={router}
      router={{ navigate: () => {}, pathname: '/dashboard/pagedash' }}
      branding={{

        logo: 
        (
          <div>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
<Button
    style={{ backgroundColor: '#0093FF', color: 'white', marginLeft: '10px' }}
    onClick={LogOut}
  >
    Logout
  </Button>
  {userss && (
    <p style={{ marginRight: '50px', marginTop: '15px' ,marginLeft:"50px"}}>Welcome, <span style={{color:"#0093FF", fontWeight:"bold", fontSize:"18px"}}>{userss}</span></p>
  )}
 
</div>
          <nav style={{ width: '250px', paddingTop: '35px' }}>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              {NAVIGATION.map((item) => (
                item.kind !== 'header' && (
                  <li  style={{ marginBottom: '15px' }}>
                    <Link
                      to={item.link}
                      style={{
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'black',
                        marginLeft:'-10px',
                        fontSize:'18px',
                      }}
                    >
                      <span style={{ marginLeft: '-40px',fontSize:'2px' }}>
                        {item.icon} {/* Display the icon */}
                      </span>
                      <span style={{marginLeft:'20px'}}>{item.title}</span>
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </nav>
       
          </div>
          
        ),
        
        title:<span style={{visibility:'hidden'}}>Hello</span>,
      }}>
        
        
      <DashboardLayout>
        {/* {RenderContent()} */}
        {/* <div style={{ display: 'flex' }}> */}
          {/* Sidebar with navigation links */}
       

          {/* Main content area */}
          {/* <div style={{ flex: 1, padding: '20px' }}> */}
            {/* Render the child routes here */}
           {/* This will render the correct child route, like Courses or PageDash */}
          {/* </div>
        </div> */}

<Outlet/>
      </DashboardLayout>

    </AppProvider>
    
    </>
  );
}
export default Dashboard;