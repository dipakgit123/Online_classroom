import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editCourse, getSingleCourse } from '../services/apiSlice';
import '../style/editform.css';
import Dashboard from './Dashboard';

const initialValue = {
    course_code: '',
    course_name: '',
    course_detail: '',
    duration: '',
    duration_in: '',
    fees: '',
    is_active: false,
};

const EditCourse = () => {
    const [course, setCourse] = useState(initialValue);
    // const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { id } = useParams();
    const selectedCours = useSelector((state) => state.allcourses.selectedUser);
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            dispatch(getSingleCourse(id))
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedCours) {
            setCourse(selectedCours);
        }
    }, [selectedCours,id]);

    const handleChange = (e) => {
        // const { name, value, type, checked } = e.target;
        // setCourse((prevCourse) => ({
        //     ...prevCourse,
        //     [name]: type === 'checkbox' ? checked : value,
        // }));
        setCourse({...course,[e.target.name]:e.target.value});
    };

    // const validate = () => {
    //     const newErrors = {};
    //     if (!course.course_code) newErrors.course_code = 'Course Code is required';
    //     if (!course.course_name) newErrors.course_name = 'Course Name is required';
    //     if (!course.duration) newErrors.duration = 'Duration is required';
    //     if (!course.fees) newErrors.fees = 'Fees is required';
    //     if (course.fees < 0) newErrors.fees = 'Fees cannot be negative';
    //     return newErrors;
    // };

    const addUpdatedCourse = async(e) => {
        e.preventDefault();
        // const validationErrors = validate();
        // if (Object.keys(validationErrors).length > 0) {
        //     setErrors(validationErrors);
        //     return;
        // }else{
     let res =  await dispatch(editCourse({ id,editCourse:course }));
     console.log(res)
        alert("Course Updated Successfully");
        navigate('/dashboard/courses');
    // }
    };

    return (
        <div>
            {/* <Dashboard/> */}
            <h1 className='headform1'>Edit Course</h1>
            {/* {Object.keys(course).length === 0 && <p>Loading...</p>} */}
            <form  className='editform'>
                <div className='firstrow'>
                    <div>
                        <label className='courselable'>Course Code:</label>
                        <input
                            type="text"
                            name="course_code"
                            placeholder='Course Code'
                            onChange={(e)=>handleChange(e)}
                            value={course.course_code}
                        />
                        {/* {errors.course_code && <span className='error'>{errors.course_code}</span>} */}
                    </div>
                    <div>
                        <label className='courselable'>Course Name:</label>
                        <input
                            type="text"
                            name="course_name"
                            placeholder='Course Name'
                            onChange={(e)=>handleChange(e)}
                            value={course.course_name}
                        />
                        {/* {errors.course_name && <span className='error'>{errors.course_name}</span>} */}
                    </div>
                </div>

                <br />

                <div className='secondrow'>
                    <label className='courselable'>Course Detail:</label>
                    <textarea
                        name='course_detail'
                        placeholder='Course Detail'
                        onChange={(e)=>handleChange(e)}
                        value={course.course_detail }
                    ></textarea>
                </div>

                <br />

                <div className='thirdrow'>
                    <div className='thridrowleft'>
                        <label className='courselable'>Duration:</label>
                        <input
                            type="text"
                            name="duration"
                            placeholder='Duration'
                            onChange={(e)=>handleChange(e)}
                            value={course.duration}
                        />
                        {/* {errors.duration && <span className='error'>{errors.duration}</span>} */}
                    </div>

                    <div className='thridrowright'>
                        <label className='courselable'>Duration In:</label>
                        <select
                            name='duration_in'
                            onChange={(e)=>handleChange(e)}
                            value={course.duration_in }
                        >
                            <option value='' disabled hidden>Choose a duration</option>
                            <option value='Days'>Days</option>
                            <option value='Months'>Months</option>
                            <option value='Years'>Years</option>
                        </select>
                    </div>
                </div>

                <br />

                <div className='fourthrow'>
                    <label className='courselable'>Fees:</label>
                    <input
                        type='number'
                        name='fees'
                        placeholder='Fees'
                        onChange={(e)=>handleChange(e)}
                        value={course.fees}
                    />
                    {/* {errors.fees && <span className='error'>{errors.fees}</span>} */}
                </div>

                <br />

                <input
                    type='checkbox'
                    name='is_active'
                    onChange={(e)=>handleChange(e)}
                    checked={course.is_active}
                />
                <label className='courselable'>Is Active?</label>

                <br />
                <button className='updatebtn' onClick={addUpdatedCourse}>Update Course</button>
            </form>
        </div>
    );
};

export default EditCourse;