import { createSlice } from "@reduxjs/toolkit";

const goalSlice = createSlice({
  name: "goal",
  initialState: {},
  reducers: {},
});

export const goalActions = goalSlice.actions;
export default goalSlice.reducer;
