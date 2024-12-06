import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "../services/SignupSlice";
import examReducer from "./examSlice"
import studentApiReducer from "../services/studentApiSlice"
import apiFeesReducer from "../services/apiFeesSlice"
import apiSlice from "../services/apiSlice";
import enquirySlice from "./enquiry";
import batchesSlice from "./batches"

export const store = configureStore({   
    reducer:{
        signup:SignupSlice,
        exams:examReducer,
        students:studentApiReducer,
        fees:apiFeesReducer,
        allcourses:apiSlice,
        enquiry:enquirySlice,
        batch:batchesSlice

    }
   
})