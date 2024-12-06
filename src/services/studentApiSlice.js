import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const Student_API_URL = 'http://127.0.0.1:8081/students';
//add details

export const  addStudent = createAsyncThunk('students/addStudent',async(newStudent)=>{
  const response=await axios.post(`${Student_API_URL}`,newStudent);
  return response.data;
})

//get all students
export const allStudent =createAsyncThunk('students/allStudent',async()=>{
  const response =await axios.get(Student_API_URL);
  return response.data;
})

// get single student
export const getSingleStudent =createAsyncThunk('students/getSingleStudent',async(id)=>{
  const response =await axios.get(`${Student_API_URL}/${id}`);
  return response.data;
})

//edit user
export const  editStudent = createAsyncThunk('students/editStudent',async({id, editStudent})=>{
  const response = await axios.put(`${Student_API_URL}/${id}`,editStudent);
  return response.data;
})
//delete
export const deleteStudent = createAsyncThunk('students/deleteStudent',async(id)=>{
  if(window.confirm('Are you sure you want to delete')){
    await axios.delete(`${Student_API_URL}/${id}`);
    return id;
}
});

  const studentApiSlice = createSlice({
    name: 'students',
    initialState: {
      data: [],
      selectedStudent:null, ///selected user is use to store single user value data
          status:'idle',  ///idle,loading,success,failure: status
          error:null, // This will hold the list of exams
    },
    reducers: { },
    extraReducers:(builder)=>{
      builder
  
      //add
      .addCase(addStudent.pending,(state)=>{
          state.status ='loading';
      })
      .addCase(addStudent.fulfilled,(state,action)=>{
          state.status ='succeeded';
          state.data.push(action.payload);
      })
      .addCase(addStudent.rejected,(state,action)=>{
          state.status ='failed';
          state.error =action.error.message;
      })

      .addCase(allStudent.pending,(state)=>{
        state.status ='loading';
    })
    .addCase(allStudent.fulfilled,(state,action)=>{
        state.status ='succeeded';
        state.data=action.payload;
    })

    .addCase(allStudent.rejected,(state,action)=>{
        state.status ='failed';
        state.error =action.error.message;   
    })

    .addCase(getSingleStudent.pending,(state)=>{
      state.status ='loading';
  })
  .addCase(getSingleStudent.fulfilled,(state,action)=>{
      state.status ='succeeded';
      state.selectedStudent=action.payload;
      })
  .addCase(getSingleStudent.rejected,(state,action)=>{
      state.status ='failed';
      state.error =action.error.message;
  })
      .addCase(editStudent.pending,(state)=>{
        state.status ='loading';
    })
    .addCase(editStudent.fulfilled,(state,action)=>{
        state.status ='succeeded';
        const index=state.data.findIndex(student=>student.id === action.payload.id);
        if(index !== -1){
            state.data[index]=action.payload;
        }

    })
    .addCase(editStudent.rejected,(state,action)=>{
        state.status ='failed';
        state.error =action.error.message;
    })
    .addCase(deleteStudent.pending,(state)=>{
      state.status ='loading';
  })
  .addCase(deleteStudent.fulfilled,(state,action)=>{
      state.status ='succeeded';
      state.data=state.data.filter((item)=>{
          return item.id  !== action.payload  //remaining    data present and delete just id
      })
  })
  .addCase(deleteStudent.rejected,(state,action)=>{
      state.status ='failed';
      state.error =action.error.message;
  })
    }
  });
  export default studentApiSlice.reducer;