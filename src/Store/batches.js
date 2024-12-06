import { createSlice } from '@reduxjs/toolkit';

const batchesSlice = createSlice({
  name: 'batch',
  initialState: {
    list: [],
    status:'idle'
  },
  reducers: {
    setExams: (state, action) => {
      state.list = action.payload;
    },
    addExamToState: (state, action) => {
      console.log('Adding exam:', action.payload);
      state.list.push(action.payload);
    },
    updateExamInState: (state, action) => {
      console.log('Updating exam:', action.payload);
      const index = state.list.findIndex((exam) => exam.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteExamFromState: (state, action) => {
      state.list = state.list.filter((exam) => exam.id !== action.payload);
    },
  },
});

export const { setExams, addExamToState, updateExamInState, deleteExamFromState } = batchesSlice.actions;

export default batchesSlice.reducer;