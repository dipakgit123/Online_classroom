import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = 'http://127.0.0.1:8081/newcourse';

//ADD COURSE
export const addCourse = createAsyncThunk('allcourses/addCourse',async(newData)=>{
    const response = await axios.post(`${API_URL}`,newData);
    return response.data;
})

//GET COURSE
export const allCours = createAsyncThunk('allcourses/allCours',async()=>{
    const response = await axios.get(API_URL);
    return response.data;
})

//GET SINGLE COURSE
export const getSingleCourse = createAsyncThunk('allcourses/getSingleCourse',async(id)=>{
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
})

//EDIT COURSE
export const editCourse = createAsyncThunk('allcourses/editCourse',async({id,editCourse})=>{
    const response = await axios.put(`${API_URL}/${id}`,editCourse);
    return response.data;
})

// DELETE USER
export const deleteCorus = createAsyncThunk('allcourses/deleteCorus',async(id)=>{
    if(window.confirm('Are you sure you want to delete')){
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
})


//SLICE
const apiSlice = createSlice({
    name: 'allcourses',
    initialState: {
        data: [],
        selectedUser: null,
        status: 'idle',
        error: null,
    },
    reducers:{},

    extraReducers:(builder)=>{
            builder
            //addcourse
            .addCase(addCourse.pending,(state)=>{
                state.status = 'loading';
            })
            .addCase(addCourse.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.data.push(action.payload);
            })
            .addCase(addCourse.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message;
            })

            //getcourse
            .addCase(allCours.pending,(state)=>{
                state.status = 'loading';
            })
            .addCase(allCours.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.data = action.payload;
            })
            .addCase(allCours.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message;
            })

            //get single course
            .addCase(getSingleCourse.pending,(state)=>{
                state.status = 'loading';
            })
            .addCase(getSingleCourse.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.selectedUser = action.payload;
            })
            .addCase(getSingleCourse.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message;
            })

            //editCourse
            .addCase(editCourse.pending,(state)=>{
                state.status = 'loading';
            })
            .addCase(editCourse.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                const index = state.data.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(editCourse.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message;
            })

            
            //deletecourse
            .addCase(deleteCorus.pending,(state)=>{
                state.status = 'loading';
            })
            .addCase(deleteCorus.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.data = state.data.filter((item)=>{
                    return item.id !== action.payload})
            })
            .addCase(deleteCorus.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message;
            })


        }
})
export default apiSlice.reducer;