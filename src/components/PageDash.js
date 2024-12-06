// import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import EmailIcon from '@mui/icons-material/Email';
// import GroupsIcon from '@mui/icons-material/Groups';
// import ImportContactsIcon from '@mui/icons-material/ImportContacts';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import React,{useEffect} from 'react';
// import {allCours} from '../services/apiSlice';
// import { useDispatch,useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// import '../style/dashboard.css';

// const PageDash = () => {
//     const dispatch = useDispatch();
//     const { data} = useSelector((state) => state.allcourses);


//     // Fetch courses data when component mounts
//     useEffect(() => {
//       dispatch(allCours()); // Dispatch the action to fetch all courses
//     }, [dispatch]);

//     const totalCourses = data ? data.length : 0; // Total number of courses
//     const is_active = data
//     ? data.filter((course) => course.is_active === "Yes").length
//     : 0;

//   return (
//     <div>
//        <div className="dash">
//         <div>
//             <h1>
//                 <span className="under">
//                     <DashboardIcon/>
//                     Dashboard
//                 </span>
//             </h1>
//         </div>
//        </div>
//        <p className="para4">Here, you can view statistics and reports.</p>

//        <section className="dash1">

//         <p className="head5">View Statistics and Reports</p>

//         <div  className="card-container">
//         <div className="allcard">
//             <table className="tab">
//               <tr>
//                 <th className="headth">
//                   <ImportContactsIcon />
//                   <Link to="/courses">Courses</Link>
//                 </th>
//               </tr>
//               <tr>
//                 <td className="tabledata">
//                   Total Courses: <span className="colcha">{totalCourses}</span>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="tabledata">
//                   Active Courses: <span className="colcha">{is_active}</span>
//                 </td>
//               </tr>
//             </table>
//           </div>

//             <div className="allcard">
//                 <table className="tab">
//                     <tr>
//                         <th className="headth"> <BatchPredictionIcon/><Link to="/courses">Batches</Link></th>
//                     </tr>
//                     <tr>
//                         <td className="tabledata">Total Batches: <span className="colcha">0</span></td>
//                     </tr>
//                     <tr>
//                         <td className="tabledata">Active Batches: <span className="colcha">5</span></td>
//                     </tr>
//                 </table>
//             </div>

//             <div className="allcard">
//                 <table className="tab">
//                     <tr>
//                         <th className="headth"> <PhoneIcon/><Link to="/enqu">Enquiries</Link></th>
//                     </tr>
//                     <tr>
//                         <td className="tabledata">Total Enquiries: <span className="colcha"> 72</span></td>
//                     </tr>
//                     <tr>
//                         <td className="tabledata">Active Enquiries: <span className="colcha"> 60</span></td>
//                     </tr>
//                 </table>
//             </div>

//             <div className="allcard">
//                 <table className="tab">
//                     <tr>
//                         <th className="headth"> <GroupsIcon/><Link to="/students">Students</Link></th>
//                     </tr>
//                     <tr>
//                         <td className="tabledata">Total Students: <span className="colcha">7</span></td>
//                     </tr>
//                     <tr>
//                         <td className="tabledata">Current Students: <span className="colcha">6</span></td>
//                     </tr>
                    
//                 </table>
//             </div>
            
//         </div>

//         <div className="card-container-1">
//             <div className="allcard1">
//                 <table className="tab1">
//                     <tr>
//                         <th className="headth"> <MonetizationOnIcon/><Link to="/fees">Fees</Link></th>
//                     </tr>
//                     <tr>
//                         <td className="tabledata">Active Students with Fees Pending: <span className="colcha">2</span></td>
//                     </tr>
//                     <tr>
//                         <td className="tabledata">Students with Fees Paid: <span className="colcha">4</span></td>
//                     </tr>
//                 </table>
//             </div>

//             {/* <div className="allcard1">
//                 <table className="tab1">
//                     <tr>
//                         <th className="headth"> <MonetizationOnIcon/><Link to="/fees">Installments</Link></th>
//                     </tr>
//                     <tr>
//                         <td className="tabledata">Total Installments: <span className="colcha"> 56</span></td>
//                     </tr>
//                     <tr>
//                         <td className="tabledata">Revenue: <span className="colcha"> 127129.00</span></td>
//                     </tr>
//                 </table>
//             </div> */}
//         </div>

//         {/* <div className="card-container-2">
//            <div className="allcard2">
//             <h6><EmailIcon/><Link to="/enqu">Recent Enquiries</Link></h6>
//             <table className="tab2">
//                     <tr>
//                         <td className="tabledata2">E10082 -<span className="colcha"> (Xyz)</span> <span className="span2">20-09-2024 4:42PM</span></td>
//                     </tr>
//                     <tr>
//                         <td className="tabledata2">E10081 -<span className="colcha"> RSM (1/24)</span> <span className="span2">19-08-2024 2:22 AM</span></td>
//                     </tr>
//                     <tr>
//                         <td className="tabledata2">E10076 -<span className="colcha">(DDT) <span className="span-3">Defensive Driving Training</span> </span> <span className="span2">12-07-2024 6:34 AM</span></td>
//                     </tr>
//                     <tr>
//                         <td className="tabledata2">E10071 -<span className="colcha"> Test (Test001)</span> <span className="span2">28-06-2024 8:18 PM</span></td>
//                     </tr>
//                     <tr>
//                         <td className="tabledata2">E10070 -<span className="colcha">  Class 10 (10th)</span> <span className="span2">20-06-2024 11:42 AM</span></td>
//                     </tr>
//                 </table>
//             </div>

//             <div className="allcard2">
//             <h6><ImportContactsIcon/><Link to="/courses">Popular Courses</Link></h6>
//             <table className="tab2">
//                    <tr>
//                        <td className="tabledata2"><span className="colcha"> DBMS (D01)</span> <span className="span2">4 Students</span></td>
//                    </tr>
//                    <tr>
//                        <td className="tabledata2"><span className="colcha"> CNA (101)</span> <span className="span2">2 Students</span></td>
//                    </tr>
//                    <tr>
//                        <td className="tabledata2"><span className="colcha">  DCA (P001)</span> <span className="span2">1 Students</span></td>
//                    </tr>
//                </table>
//             </div>

//         </div> */}
        
//        </section>
//        <br></br>
//        <br></br>
//     </div>
//   )
// }

// export default PageDash




import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import React, { useEffect, useState } from 'react';
import { allCours } from '../services/apiSlice';
// import { fetchExams } from '../services/batchesapi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allFees } from '../services/apiFeesSlice';
import { fetchExams } from '../services/apii'; // Add this service
import { fetchExams2 } from '../services/batchesapi';
import { allStudent } from '../services/studentApiSlice';

import '../style/dashboard.css';

const PageDash = () => {
  const dispatch = useDispatch();
  const { data: courses } = useSelector((state) => state.allcourses);
//   const { data: batches } = useSelector((state) => state.batch);
  // const { data: enquiry } = useSelector((state) => state.enquiry);
  const { data: students } = useSelector((state) => state.students);
  const { data: fees } = useSelector((state) => state.fees);
  const [ids, setIds] = useState([]);
  const [isactiveId, setIsActiveId] = useState([]);

  const [batchId, setBatchID] =  useState([])
  const [isactiveBatch, setIsActiveBatch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exams = await fetchExams(); // Fetch the data
        const extractedIds = exams.map((exam) => exam.id); // Extract IDs
        const isActiveIds = exams.filter((exam)=> exam.isPublished)
        setIds(extractedIds); // Update state
        setIsActiveId(isActiveIds)
      
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const exams = await fetchExams2(); // Fetch the data
        const extractedIds = exams.map((exam) => exam.id); // Extract IDs
        const isActiveIds = exams.filter((exam)=> exam.isPublished)
        setBatchID(extractedIds); // Update state
        
          setIsActiveBatch(isActiveIds)
        
       
      
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchData1();
  }, []);

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(allCours());
    // dispatch(fetchExams());
    // dispatch(fetchExams());
    dispatch(allStudent());
    dispatch(allFees());
  }, [dispatch]);

  // Total counts
  const totalCourses = courses ? courses.length : 0;
  const is_active_courses = courses
    ? courses.filter((course) => course.is_active === 'Yes').length
    : 0;

//   const totalBatches = batches ? batches.length : 0;
//   const activeBatches = batches ? batches.filter((batch) => batch.is_active === 'Yes').length : 0;

  // const totalEnquiries = enquiry? enquiry.length : 0;
//   const activeEnquiries = enquiries ? enquiries.filter((enquiry) => enquiry.is_active === 'Yes').length : 0;

  const totalStudents = students ? students.length : 0;
//   const currentStudents = students ? students.filter((student) => student.status === 'Current').length : 0;

  const pendingFees = students ? students.filter((fee) => fee.feespaid != 0 ).length : 0;
//   const paidFees = fees ? fees.filter((fee) => fee.status === 'Paid').length : 0;

  return (
    <div>
      <div className="dash">
        <div>
          <h1>
            <span className="under">
              <DashboardIcon />
              Dashboard
            </span>
          </h1>
        </div>
      </div>
      <p className="para4">Here, you can view statistics and reports.</p>

      <section className="dash1">
        <p className="head5">View Statistics and Reports</p>

        <div className="card-container">
          <div className="allcard">
            <table className="tab">
              <tbody>
                <tr>
                  <th className="headth">
                    <ImportContactsIcon />
                    <Link to="/dashboard/courses">Courses</Link>
                  </th>
                </tr>
                <tr>
                  <td className="tabledata">
                    Total Courses: <span className="colcha">{totalCourses}</span>
                  </td>
                </tr>
                <tr>
                  <td className="tabledata">
                    Active Courses: <span className="colcha">{is_active_courses}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="allcard">
            <table className="tab">
              <tbody>
                <tr>
                  <th className="headth">
                    <BatchPredictionIcon />
                    <Link to="/dashboard/batch">Batches</Link>
                  </th>
                </tr>
                <tr>
                  <td className="tabledata">
                    Total Batches: <span className="colcha">{batchId.length}</span>
                  
                  </td>
                </tr>
                <tr>
                  <td className="tabledata">
                    Active Batches: <span className="colcha">{ isactiveBatch.length}</span>
                    {/* {activeBatches} */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="allcard">
            <table className="tab">
              <tbody>
                <tr>
                  <th className="headth">
                    <PhoneIcon />
                    <Link to="/dashboard/enqu">Enquiries</Link>
                  </th>
                </tr>
                <tr>
                  <td className="tabledata">
                    Total Enquiries: <span className="colcha">  {ids.length}</span>
                  
                  </td>
                </tr>
                <tr>
                  <td className="tabledata">
                    Active Enquiries: <span className="colcha">{isactiveId.length}</span>
                    {/* {activeEnquiries} */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="allcard">
            <table className="tab">
              <tbody>
                <tr>
                  <th className="headth">
                    <GroupsIcon />
                    <Link to="/dashboard/students">Students</Link>
                  </th>
                </tr>
                <tr>
                  <td className="tabledata">
                    Total Students: <span className="colcha"> {totalStudents} </span>
                   
                  </td>
                </tr>
                <tr>
                  <td className="tabledata">
                    Current Students: <span className="colcha">0</span>
                    {/* {currentStudents} */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-container-1">
          <div className="allcard1">
            <table className="tab1">
              <tbody>
                <tr>
                  <th className="headth">
                    <MonetizationOnIcon />
                    <Link to="/dashboard/fees">Fees</Link>
                  </th>
                </tr>
                <tr>
                  <td className="tabledata">
                    Active Students with Fees Pending: <span className="colcha"> {pendingFees}</span>
                   
                  </td>
                </tr>
                <tr>
                  <td className="tabledata">
                    Students with Fees Paid: <span className="colcha">0</span>
                    {/* {paidFees} */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageDash;
