// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import './App.css';
// import Batches from './Store/batches';
// import Courses from './components/Courses';
// import Dashboard from './components/Dashboard';
// import EditCourse from './components/EditCourse';
// import EditStudents from './components/EditStudents';
// import Enquiries from './components/Enquiries';
// import ExamResult from './components/ExamResult';
// import Fees from './components/Fees';
// import FeesEdit from './components/FeesEdit';
// import Home from './components/Home';
// import Report from './components/Report';
// import Students from './components/Students';


// const Layout  = () =>{
//   <>
//   </>
// }

// const router = createBrowserRouter([
 
//       {
//         index:true,
//         element :<Home/>
//       },
//       {
//         path:"/dashboard",
//         element :<Dashboard/>,
//         children:[
//           {
//             path:"report",
//             element:<Report/>
//           },
//         ]
//        },

      
//           {
//             path:"students",
//             element:<Students/>,
//           },
//       {
//         path:"/examresult",
//         element:<ExamResult/>
//       },
//       {
//         path:'/editstudents/:id',
//         element:<EditStudents/>
//       },{
//         path:"/editfees/:id",
//         element:<FeesEdit/>
//       },{
//         path:"/fees",
//         element:<Fees/>
//       },
//       {
//         path:"/courses",
//         element:<Courses/>
//       },{
//         path:'/edit/:id',
//         element:<EditCourse/>
//       },
//       {
//         path:"/enqu",
//         element:<Enquiries/>
//       },
//       {
//         path:'/batch',
//         element:<Batches/>
//       }

// ])
// function App() {
//   return (
//     <>
//      <RouterProvider router={router } />
//     </>
//   );
// }

// export default App;



import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Batches from './components/Batches';
import Courses from './components/Courses';
import Dashboard from './components/Dashboard';
import EditCourse from './components/EditCourse';
import EditStudents from './components/EditStudents';
import Enquiries from './components/Enquiries';
import ExamResult from './components/ExamResult';
import Fees from './components/Fees';
import FeesEdit from './components/FeesEdit';
import Home from './components/Home/Home';
import PageDash from './components/PageDash';
import Report from './components/Report';
import Students from './components/Students';
// import Slider1Img from "./asset/images/slider1.png";
// import Slider2Img from "./asset/images/slider2.png"

import  Images  from "./utils/Images";

// Router configuration with nested routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,  // Wrap Dashboard with the existing layout
    children: [
      { path: "", element: <PageDash /> },  // Default dashboard view
      { path: "courses", element: <Courses /> },
      { path: "pagedash", element: <PageDash /> },
      { path: "batch", element: <Batches /> },
      { path: "enqu", element: <Enquiries/> },
      { path: "students", element:<Students/> },
      { path: "fees", element:<Fees/> },
      { path: "examresult", element:<ExamResult/> },
      { path: "report", element:<Report/> },
      { path: "edit/:id", element: <EditCourse /> },
      { path: "editfees/:id", element: <FeesEdit/> },
      { path: "editstudents/:id", element: <EditStudents/> },
    ],
  },
]);



function App() {

  return (
    <RouterProvider router={router} />
  );

}


export default App;