import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk}  from '@reduxjs/toolkit';

const Fees_API_URL = 'http://127.0.0.1:8081/fees';


  //add details
  export const  addFees = createAsyncThunk('fees/addFees',async(newFees)=>{
    const response=await axios.post(`${Fees_API_URL}`,newFees);
    return response.data;
  })

  export const allFees =createAsyncThunk('fees/allFess',async()=>{
    const response =await axios.get(Fees_API_URL);
    return response.data;
  })
  
  //edit user
  export const  editFees = createAsyncThunk('fees/editFees',async({id,editFees})=>{
    const response=await axios.put(`http://127.0.0.1:8081/fees/${id}`,editFees);
    return response.data;
  })
  
  // get single student
  export  const getSingleFees = createAsyncThunk('fees/getSingleFees',async(id)=>{
    const response=await axios.get(`http://127.0.0.1:8081/fees/${id}`);
    console.log(response.data);
    return response.data;
  })

//delete
  export const deleteFees = createAsyncThunk('fees/deleteUser',async(id)=>{
    if(window.confirm('Are you sure you want to delete')){
      await axios.delete(`${Fees_API_URL}/${id}`);
      return id;
  }
});
  
const apiFeesSlice = createSlice({
    name: 'fees',
    initialState: {
      data: [],
      selectedStudent:null, ///selected user is use to store single user value data
      status:'idle',  ///idle,loading,success,failure: status
      error:null, // This will hold the list of exams
    },
    reducers: {
    },
    extraReducers:(builder)=>{
      builder
  
      //add
      .addCase(addFees.pending,(state)=>{
          state.status ='loading';
      })
      .addCase(addFees.fulfilled,(state,action)=>{
          state.status ='succeeded';
          state.data.push(action.payload);
      })
      .addCase(addFees.rejected,(state,action)=>{
          state.status ='failed';
          state.error =action.error.message;
      })
      .addCase(allFees.pending,(state)=>{
        state.status ='loading';
    })
    .addCase(allFees.fulfilled,(state,action)=>{
        state.status ='succeeded';
        state.data=action.payload;
    })

    .addCase(allFees.rejected,(state,action)=>{
        state.status ='failed';
        state.error =action.error.message;   
    })
  
      .addCase(editFees.pending,(state)=>{
        state.status ='loading';
    })
    .addCase(editFees.fulfilled,(state,action)=>{
        state.status ='succeeded';
        const index=state.data.findIndex(fees=>fees.id ===action.payload.id);
        if(index !== -1){
            state.data[index]=action.payload;
        }
  
    })
    .addCase(editFees.rejected,(state,action)=>{
        state.status ='failed';
        state.error =action.error.message;
    })
  
    //single user
    .addCase(getSingleFees.pending,(state)=>{
      state.status ='loading';
  })
  .addCase(getSingleFees.fulfilled,(state,action)=>{
      state.status ='succeeded';
      state.selectedFees=action.payload;
      })
  .addCase(getSingleFees.rejected,(state,action)=>{
      state.status ='failed';
      state.error =action.error.message;
  })
  .addCase(deleteFees.pending,(state)=>{
    state.status ='loading';
})
.addCase(deleteFees.fulfilled,(state,action)=>{
    state.status ='succeeded';
    state.data=state.data.filter((item)=>{
        return item.id  !== action.payload  //remaining    data present and delete just id
    })
})
.addCase(deleteFees.rejected,(state,action)=>{
    state.status ='failed';
    state.error =action.error.message;
})
    }
  });
  
  // export const { setFeesDetails } = apiFeesSlice.actions;
  
  export default apiFeesSlice.reducer;