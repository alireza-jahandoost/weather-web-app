import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  day: "",
  month: "",
  year: "",
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {},
});

export default dateSlice.reducer;
