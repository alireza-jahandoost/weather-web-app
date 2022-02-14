import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: "",
  tempmax: "",
  tempmin: "",
  temp: "",
  feelslike: "",
  humidity: "",
  windspeed: "",
  icon: "",
  pressure: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
});

export default weatherSlice.reducer;
