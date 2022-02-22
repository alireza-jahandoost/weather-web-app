import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { weatherUrl } from "../api/urlCreator";
import { KEY } from "../api/key.js";
import { updateDate } from "./dateSlice";
import { updateLocation } from "./locationSlice";
import { parse } from "date-fns";

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

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ location, date }, { dispatch }) => {
    const response = await fetch(weatherUrl({ location, date, key: KEY }));

    const data = await response.json();
    dispatch(
      updateLocation({
        location: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      })
    );
    const stringedDate = data.days[0].datetime;
    const dateObject = parse(stringedDate, "yyyy-MM-dd", new Date());
    dispatch(
      updateDate({
        day: dateObject.getDate(),
        month: dateObject.getMonth() + 1,
        year: dateObject.getFullYear(),
      })
    );
    return data;
  }
);

export const initialState = {
  data: {
    ...keys.reduce(
      (obj, current) => ({
        ...obj,
        [current]: "",
      }),
      {}
    ),
  },
  // 'idle' | 'pending' | 'fulfilled' | 'rejected'
  status: "idle",
  // null | message
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "fulfilled";
        for (const key of keys) {
          state.data[key] =
            action.payload[key] ||
            (action.payload.days && action.payload?.days[0][key]) ||
            null;
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { updateWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
