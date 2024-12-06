// import React  , { useState ,useEffect}from 'react'
// import ImportContactsIcon from '@mui/icons-material/ImportContacts';
// import '../style/course.css'
// import AddIcon from '@mui/icons-material/Add';
// import {Table,TableHead,TableRow,TableCell, TableBody,styled,Button,
//         Dialog,DialogActions,DialogContent,DialogTitle} from '@mui/material/';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import '../style/form.css'
// import {useDispatch,useSelector} from 'react-redux'
// import { addCourse,allCours,deleteCorus } from '../services/apiSlice';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Pagination from '@mui/material/Pagination';
// import { Link } from 'react-router-dom';


// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// const initialValue={
//     course_code:'',
//     course_name:'',
//     course_detail:'',
//     duration:'',
//     duration_in:'',
//     fees:'',
//     is_active:''
//     }


// const StyledTable=styled(Table)`
// width:90%;
// margin:50px 0 0 50px;
// // border:2px solid black;
// `

// const THead=styled(TableRow)`
// &>th{
//   font-size:25px;
//   font-weight:bold;
//   background-color:#FFFFFF;
//   color:black;
//   text-align:center;
// }
// &>td{
//   font-size:20px;
//   text-align:center;
//   color:black;
// }

//  &:nth-child(even) {
//   background-color: #FFFFFF;
// }

//  &:nth-child(odd) {
//   background-color: #F2F2F2;
// }
// `
// const Vercel =styled(TableCell)
// `
//   border-right: 1px solid #ccc;
// `




// const Courses = () => {

//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//     setCourse(initialValue); // Reset form
//     setErrors({});

//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

// ///////////////////////////////////////////////
//   const [searchTerm, setSearchTerm] = useState(''); // State for search input
//   const [course,setCourse] = useState(initialValue);
//   const [errors, setErrors] = useState({});
//   const dispatch = useDispatch();
//   const status = useSelector((state)=>state.allcourses.status);
//   const error = useSelector((state)=>state.allcourses.error);
//   const users = useSelector((state)=>state.allcourses.data);
//   const [currentPage, setCurrentPage] = useState(1); // Current page
//   const itemsPerPage = 5; // Number of items per page (set to 5)

//   const handleChange=(e)=>{
//     setCourse({...course,[e.target.name]:e.target.value})//spread operator is used
//     console.log(course)
//   }

//   const validateForm = () => {
//     const newErrors = {};
//     if (!course.course_code) newErrors.course_code = 'Course Code is required';
//     if (!course.course_name) newErrors.course_name = 'Course Name is required';
//     if (!course.duration) newErrors.duration = 'Duration is required';
//     if (!course.fees) newErrors.fees = 'Fees are required';
//     if (course.fees <= 0) newErrors.fees = 'Fees must be greater than 0';
//     return newErrors;
//   };


//   const addCourseDetails = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     dispatch(addCourse(course));
//     alert('Course Added Successfully');
//     handleClose();
//   };

//   ////////////////////////////////Time Date/////////////////////////////
  
//   const [addedDate, setAddedDate] = useState(null);
//   useEffect(() => {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });

//     setAddedDate(formattedDate);
    
//   }, []);

  
//   /////////////////////////////////////////// DELETE //////////////////////////////
//   const deleteCourseData=(id)=>{
//     dispatch(deleteCorus(id));
//  }


// ////////////////////////////////////TABLE///////////////////////////////
 
// useEffect(()=>{
//   if(status ==='idle'){
//     dispatch(allCours());
//   }
// },[status,dispatch]);

//   // Calculate the index of the last item on the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   // Calculate the index of the first item on the current page
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   // Slice the data to get the items for the current page
//   const filteredUsers = users.filter(course =>
//     course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     course.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     course.fees.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     course.course_code.toLowerCase().includes(searchTerm.toLowerCase())
//   ).slice(indexOfFirstItem, indexOfLastItem);



// let content;
// if(status === 'loading'){
//   content = <h1>Loading...</h1>;
// }
// else if(status === 'succeeded'){


//   content = (
//     <StyledTable border={3}>
//       <TableHead>
//         <THead>
//           <Vercel>Course Code</Vercel>
//           <Vercel>Course Name</Vercel>
//           <Vercel>Duration</Vercel>
//           <Vercel>Fees</Vercel>
//           <Vercel>Added On</Vercel>
//           {/* <Vercel>Time</Vercel> */}
//           <Vercel>Added By</Vercel>
//           <Vercel>Action</Vercel>
//         </THead>
//       </TableHead>
//       <TableBody>
//         {/* {users.map(course => ( */}
//         {filteredUsers.map(course => (
//             <THead key={course.id}>
//             <Vercel>{course.course_code}</Vercel>
//             <Vercel>{course.course_name}</Vercel>
//             <Vercel>{course.duration} {course.duration_in}</Vercel>
//             <Vercel>{course.fees}</Vercel>
//             <Vercel>{addedDate}</Vercel>
//             {/* <Vercel>{addedTime}</Vercel> */}
//             <Vercel>"Institute_Admin"</Vercel>
//             <Vercel>
//             <Link to={`/edit/${course.id}`} color='success' style={{marginRight:"20px"}}> <EditNoteIcon/></Link>
//             <span style={{color: '#D33333',cursor:'pointer' }} onClick={()=>deleteCourseData(course.id)}><DeleteIcon/></span>        
//             </Vercel>
//              </THead>
//           ))}
//       </TableBody>
//     </StyledTable>
//   )
// }
// else if(status === 'failed'){
//   content = <h1>{error}</h1>
// }

//   // Calculate total pages
//   const totalPages = Math.ceil(users.filter(course =>
//     course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     course.course_code.toLowerCase().includes(searchTerm.toLowerCase())
//   ).length / itemsPerPage);


//   return (
//     <div>
//       {/* <Dashboard/> */}
//       <div className="cour">
//         <div>
//             <h1>
//                 <span className="under">
//                     <ImportContactsIcon/>
//                     Courses
//                 </span>
//             </h1>
//         </div>
//        </div>

//        <p className="para3">Here, you can either add a new course or edit existing courses.</p>

//       <section className='cour1'>
//         <p className="courhead">
//         Manage Courses
//         <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen} className='addbtn'>
//         <AddIcon/>Add New Course
//       </Button>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//             Add New Course
//         </DialogTitle>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={(theme) => ({
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: theme.palette.grey[500],
//           })}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent dividers>
//             <form>
//                 <div className='firstrow'>
//                     <div>
//                         <label>Course Code:</label>
//                         <input type="text" name="course_code" placeholder='Course Code' onChange={(e)=>handleChange(e)}/>
//                         {errors.course_code && <span className="error">{errors.course_code}</span>}
                        
//                     </div>
//                     <div>
//                         <label>Course Name:</label>
//                         <input type="text" name="course_name" placeholder='Course Name'onChange={(e)=>handleChange(e)}/>
//                         {errors.course_name && <span className="error">{errors.course_name}</span>}
//                     </div>
//                 </div>

//                 <br/>

//                 <div className='secondrow'>
//                 <label>Course Detail:</label>
//                 <textarea name='course_detail' placeholder='Course Detail' onChange={(e)=>handleChange(e)}></textarea>
//                 </div>

//                 <br/>

//                 <div className='thirdrow'>
//                     <div className='thridrowleft'>
//                         <label>Duration:</label>
//                         <input type="text" name="duration"  placeholder='Duration' onChange={(e)=>handleChange(e)}/>
//                         {errors.duration && <span className="error">{errors.duration}</span>}
//                     </div>

//                     <div className='thridrowright'>
//                         <label>Duration In:</label>
//                         <select name='duration_in' onChange={(e)=>handleChange(e)}>
//                             <option value='' disabled selected hidden>Choose a duration</option>
//                             <option value='Days'>Days</option>
//                             <option value='Months'>Months</option>
//                             <option value='Years'>Years</option>
//                         </select>
//                     </div>

//                 </div>

//                 <br/>

//                 <div className='fourthrow'>
//                 <label>Fees:</label>
//                 <input type='number' name='fees' placeholder='Fees' onChange={(e)=>handleChange(e)}/>
//                 {errors.fees && <span className="error">{errors.fees}</span>}
//                 </div>

//                 <br/>

//                 <input type='checkbox' name='is_active' onChange={(e)=>handleChange(e)}/>
//                 <label>Is Active?</label>
//             </form>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose} className='canclebtn'>
//             Cancel
//           </Button>
//           <Button autoFocus onClick={addCourseDetails} className='newbtn'>
//             Add New Course
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </React.Fragment>
//         </p>

//          {/* Search Input Field */}
//          <div style={{ margin: '20px 50px' }}>
//           <input
//             type="text"
//             placeholder="Search by Course Code or Name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{
//               padding: '10px',
//               borderRadius: '4px',
//               border: '1px solid #ccc',
//               width: '300px',
//             }}
//           />
//         </div>

//         <div>
//           {content}
//       </div>


//         {/* Pagination Component */}
//         <div>
//           <Pagination
//             count={totalPages}
//             page={currentPage}
//             onChange={(event, value) => setCurrentPage(value)} // Update current page
//             variant="outlined"
//             shape="rounded"
//             style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px', marginRight: '100px' }}
//           />
//         </div>
      
//       </section>

//     </div>
//   )
// }

// export default Courses

import React  , { useState ,useEffect}from 'react'
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import '../style/course.css'
import AddIcon from '@mui/icons-material/Add';
import {Table,TableHead,TableRow,TableCell, TableBody,styled,Button,
        Dialog,DialogActions,DialogContent,DialogTitle,FormControl,InputLabel,MenuItem,Select} from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../style/form.css'
import {useDispatch,useSelector} from 'react-redux'
import { addCourse,allCours,deleteCorus } from '../services/apiSlice';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const initialValue={
    course_code:'',
    course_name:'',
    course_detail:'',
    duration:'',
    duration_in:'',
    fees:'',
    is_active:''
    }


const StyledTable=styled(Table)`
width:90%;
margin:50px 0 0 50px;
// border:2px solid black;
`

const THead=styled(TableRow)`
&>th{
  font-size:25px;
  font-weight:bold;
  background-color:#FFFFFF;
  color:black;
  text-align:center;
}
&>td{
  font-size:20px;
  text-align:center;
  color:black;
}
`
const Vercel =styled(TableCell)
`
  border-right: 1px solid #ccc;
`




const Courses = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setCourse(initialValue); // Reset form
    setErrors({});

  };
  const handleClose = () => {
    setOpen(false);
  };

///////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [course,setCourse] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const status = useSelector((state)=>state.allcourses.status);
  const error = useSelector((state)=>state.allcourses.error);
  const users = useSelector((state)=>state.allcourses.data);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  // const itemsPerPage = 5; // Number of items per page (set to 5)
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleChange=(e)=>{
    setCourse({...course,[e.target.name]:e.target.value})//spread operator is used
    console.log(course)
  }

  const handlePageSizeChange = (e) => {
    setItemsPerPage(e.target.value); // Set the selected items per page
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  
  const handleChan = (e) => {
    const { name, type, checked, value } = e.target;
    // If the input is a checkbox, update the is_active field accordingly
    if (type === 'checkbox') {
        setCourse({ ...course, [name]: checked ? 'Yes' : 'No' });
    } else {
        setCourse({ ...course, [name]: value });
    }
    console.log(course);
};

  const validateForm = () => {
    const newErrors = {};
     if (!course.course_code) {
        newErrors.course_code = 'Course Code is required';
    } 
    // Check if course_code length is less than 6
    else if (course.course_code.length < 6) {
        newErrors.course_code = 'Course Code should be 6 characters long or more';
    } 
    // Check for special characters using regex
    else if (!/^[a-zA-Z0-9]+$/.test(course.course_code)) {
        newErrors.course_code = 'Dont enter special characters';
    } 
    // Check for empty spaces in the input
    else if (course.course_code.trim() === '') {
        newErrors.course_code = 'Course Code is required';
    }
    if (!course.course_name) {
      newErrors.course_name = 'Course Name is required';
  } 
  // Check if course_name length is less than 3
  else if (course.course_name.length < 3) {
      newErrors.course_name = 'Course Name should be 3 characters long or more';
  } 
  // Check for special characters using regex
  else if (/[^A-Za-z\s]/.test(course.course_name)) {
      newErrors.course_name = 'Don\'t enter special characters or numbers';
  } 
  // Check for empty spaces in the input
  else if (course.course_name.trim() === '') {
      newErrors.course_name = 'Course Name is required';
  } 
  if (!course.duration) {
    newErrors.duration = 'Duration is required';
} 
// Check for special characters using regex
else if (/[^0-9\s]/.test(course.duration)) {
    newErrors.duration = 'Don\'t enter special characters or alphabetic characters';
} 
// Check for empty spaces in the input
else if (course.duration.trim() === '') {
    newErrors.duration = 'Duration is required';
} 
if (!course.fees) {
  newErrors.fees = 'Fees are required';
} 
// Check for empty spaces in the input
else if (course.fees.trim() === '') {
  newErrors.fees = 'Fees are required';
} 
// Check if fees is greater than 0
else if (course.fees <= 0) {
  newErrors.fees = 'Fees should be greater than 0';
}
if (!course.course_detail) {
  newErrors.course_detail = 'Course details is required';
} 
// Check for special characters using regex
else if (/[^A-Za-z\s]/.test(course.course_detail)) {
  newErrors.course_detail = 'Don\'t enter special characters or numbers';
} 
// Check for empty spaces in the input
else if (course.course_detail.trim() === '') {
  newErrors.course_detail = 'Course details is required';
} 
if(!course.duration_in){
  newErrors.duration_in = 'duration is required';

}
return newErrors;
  };


  const addCourseDetails = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(addCourse(course));
    alert('Course Added Successfully');
    handleClose();
  };
  /////////////////////////////////////////// DELETE //////////////////////////////
  const deleteCourseData=(id)=>{
    dispatch(deleteCorus(id));
 }


////////////////////////////////////TABLE///////////////////////////////
 
useEffect(()=>{
  if(status ==='idle'){
    dispatch(allCours());
  }
},[status,dispatch]);

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the data to get the items for the current page
  const filteredUsers = users.filter(course =>
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.course_code.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);



let content;
if(status === 'loading'){
  content = <h1>Loading...</h1>;
}
else if(status === 'succeeded'){


  content = (
    <StyledTable border={3}>
      <TableHead>
        <THead>
          <Vercel>Course Code</Vercel>
          <Vercel>Course Name</Vercel>
          <Vercel>Duration</Vercel>
          <Vercel>Active</Vercel>
          <Vercel>Fees</Vercel>
          <Vercel>Added By</Vercel>
          <Vercel>Action</Vercel>
        </THead>
      </TableHead>
      <TableBody>
        {filteredUsers.map(course => (
            <THead key={course.id}>
            <Vercel>{course.course_code}</Vercel>
            <Vercel>{course.course_name}</Vercel>
            <Vercel>{course.duration} {course.duration_in}</Vercel>
            <Vercel>{course.is_active}</Vercel>
            <Vercel>{course.fees}</Vercel>
            <Vercel>"Institute_Admin"</Vercel>
            <Vercel>
            {/* <Link to={/edit/${course.id}} color='success' style={{marginRight:"20px"}}> <EditNoteIcon/></Link> */}
             <Link to={`/dashboard/edit/${course.id}`} color='success' style={{marginRight:"20px"}}> <EditNoteIcon/></Link>

            <span style={{color: '#D33333',cursor:'pointer' }} onClick={()=>deleteCourseData(course.id)}><DeleteIcon/></span>        
            </Vercel>
             </THead>
          ))}
      </TableBody>
    </StyledTable>
  )
}
else if(status === 'failed'){
  content = <h1>{error}</h1>
}

  // Calculate total pages
  const totalPages = Math.ceil(users.filter(course =>
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.course_code.toLowerCase().includes(searchTerm.toLowerCase())
  ).length / itemsPerPage);


  return (
    <div>
      {/* <Dashboard/> */}
      <div className="cour">
        <div>
            <h1>
                <span className="under">
                    <ImportContactsIcon/>
                    Courses
                </span>
            </h1>
        </div>
       </div>

       <p className="para3">Here, you can either add a new course or edit existing courses.</p>

      <section className='cour1'>
        <p className="courhead">
        Manage Courses
        <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} className='addbtn'>
        <AddIcon/>Add New Course
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Add New Course
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <form>
                <div className='firstrow'>
                    <div>
                        <label>Course Code:</label>
                        <input type="text" name="course_code" placeholder='Course Code' onChange={(e)=>handleChange(e)}/>
                        {errors.course_code && <span className="error">{errors.course_code}</span>}
                        
                    </div>
                    <div>
                        <label>Course Name:</label>
                        <input type="text" name="course_name" placeholder='Course Name'onChange={(e)=>handleChange(e)}/>
                        {errors.course_name && <span className="error">{errors.course_name}</span>}
                    </div>
                </div>

                <br/>

                <div className='secondrow'>
                <label>Course Detail:</label>
                <textarea name='course_detail' placeholder='Course Detail' onChange={(e)=>handleChange(e)}></textarea>
                {errors.course_detail && <span className="error">{errors.course_detail}</span>}
                </div>

                <br/>

                <div className='thirdrow'>
                    <div className='thridrowleft'>
                        <label>Duration:</label>
                        <input type="text" name="duration"  placeholder='Duration' onChange={(e)=>handleChange(e)}/>
                        {errors.duration && <span className="error">{errors.duration}</span>}
                    </div>

                    <div className='thridrowright'>
                        <label>Duration In:</label>
                        <select name='duration_in' onChange={(e)=>handleChange(e)}>
                            <option value='' disabled selected hidden>Choose a duration</option>
                            <option value='Days'>Days</option>
                            <option value='Months'>Months</option>
                            <option value='Years'>Years</option>
                        </select>
                        {errors.duration_in && <span className="error">{errors.duration_in}</span>}
                    </div>

                </div>

                <br/>

                <div className='fourthrow'>
                <label>Fees:</label>
                <input type='number' name='fees' placeholder='Fees' onChange={(e)=>handleChange(e)}/>
                {errors.fees && <span className="error">{errors.fees}</span>}
                </div>

                <br/>

                <input type='checkbox' name='is_active'  checked={course.is_active === 'Yes'}  onChange={handleChan}/>
                <label>Is Active?</label>
            </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className='canclebtn'>
            Cancel
          </Button>
          <Button autoFocus onClick={addCourseDetails} className='newbtn'>
            Add New Course
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
        </p>

         {/* Search Input Field */}
         <div style={{ margin: '20px 50px' }}>
          <input
            type="text"
            placeholder="Search by Course Code or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '300px',
            }}
          />
        </div>

        
        <div>
          {content}
      </div>


        <div style={{ margin: '20px 50px'}}>
          <FormControl variant="outlined" style={{ width: '200px' }}>
            <InputLabel>Items per Page</InputLabel>
            <Select
              value={itemsPerPage}
              onChange={handlePageSizeChange}
              label="Items per Page"
              style={{ height:'40px'}}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Pagination Component */}
        <div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)} // Update current page
            variant="outlined"
            shape="rounded"
            style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-60px', marginRight: '100px' }}
          />
        </div>
      
      </section>

    </div>
  )
}

export default Courses