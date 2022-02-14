import { createSlice } from "@reduxjs/toolkit";

export const keys = [
  "description",
  "tempmax",
  "tempmin",
  "temp",
  "feelslike",
  "humidity",
  "windspeed",
  "icon",
  "pressure",
];

export const initialState = {
  ...keys.reduce(
    (obj, current) => ({
      ...obj,
      [current]: "",
    }),
    {}
  ),
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    updateWeather: (state, action) => {
      for (const key of keys) {
        if (action.payload.hasOwnProperty(key)) {
          state[key] = action.payload[key];
        } else {
          state[key] = null;
        }
      }
    },
  },
});

export const { updateWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
