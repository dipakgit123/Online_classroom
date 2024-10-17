import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "../services/SignupSlice";

export const store = configureStore({   
    reducer:{
        signup:SignupSlice
    }
   
})