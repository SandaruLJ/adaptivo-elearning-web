import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: { selectedUnit: {section:0,unit:0} },
  reducers: {
    setSelectedUnit(state, actions) {
      state.selectedUnit = actions.payload;
    },
   
  },
});

export const courseActions = courseSlice.actions;

export default courseSlice;
