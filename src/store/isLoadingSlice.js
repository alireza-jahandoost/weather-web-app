import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState,
  reducers: {
    loadingBegin: (state) => {
      return true;
    },
    loadingEnd: (state) => {
      return false;
    },
  },
});

export const { loadingBegin, loadingEnd } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
