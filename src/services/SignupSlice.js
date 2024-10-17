import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SIGNUPAPI = "http://127.0.0.1:8081/signup";

export const addUser = createAsyncThunk('signup/addUser', async(newData)=>{
    const response = await axios.post(`${SIGNUPAPI}`, newData)
    // console.log(response)
    return response.data;
})

export const loginUser = createAsyncThunk('signup/loginUser', async({email,password})=>{

    try{
     const response = await axios.get(SIGNUPAPI)
     const signup = response.data
    //  console.log(signup)

     const user = signup.find(u => u.email === email && u.password === password)
    //  console.log(user)

     if(user){
        return {success:true, user, signup}
     }else{
        return {success:false,message:"Invalid username or password"}
     }
    }catch(error){
        console.log("error while login user",error.message);
        return {success:false,message:"an error occured during login"}
  }
})



// export const resetPassword = createAsyncThunk(
//     'signup/resetPassword',
//     async ({ email, password }, { rejectWithValue }) => {
//       try {
//         // Send the email and new password to the backend
//         const response = await axios.put(SIGNUPAPI, { email, password });
//         console.log(response.data)
//         // Check if the response was successful
//         if (response.status === 200) {
//           console.log('Password updated successfully:', response.data);
//           return response.data; // Return the data to the component as payload
//         } else {
//           throw new Error('Failed to update password');
//         }
//       } catch (error) {
//         console.error('Error updating password:', error.message);
//         return rejectWithValue(error.response?.data || 'Something went wrong during password reset');
//       }
//     }
//   );
  



const SignupSlice = createSlice({
    name:"signup",
    initialState:{
        data:[],
        selectedUser : null,
        status:'idle',
        error:null
    },
    reducers:{},

    extraReducers:(builder)=>{
        builder
        .addCase(addUser.pending,(state)=>{
            state.status = 'pending'
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.status = 'success';
            state.data.push(action.payload);
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(loginUser.pending, (state)=>{
            state.status = 'pending'
        })
        .addCase(loginUser.fulfilled, (state,action)=>{
            state.status = 'success';
            state.signup = action.payload.user
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.status = 'failed';
            state.error = action.error.message
        })
        // .addCase(resetPassword.pending, (state) => {
        //     state.status = 'pending';
        // })
        // .addCase(resetPassword.fulfilled, (state, action) => {
        //     state.status = 'success';
        //     state.message = 'Password has been updated successfully!';
        //     state.data = action.payload; // This contains the data from the API response
        // })
        // .addCase(resetPassword.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.message = action.payload || 'Failed to reset password. Please try again.'; // Use the error message from payload or default one
        // });
        
    }
})

export default SignupSlice.reducer