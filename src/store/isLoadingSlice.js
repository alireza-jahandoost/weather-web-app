import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState,
  reducers: {},
});

export default isLoadingSlice.reducer;
