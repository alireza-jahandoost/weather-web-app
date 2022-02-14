import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  location: "",
  latitude: "",
  longitude: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    updateLocation: (state, action) => {
      const { location, latitude, longitude } = action.payload;
      state.location = location;
      state.latitude = latitude;
      state.longitude = longitude;
    },
  },
});

export const { updateLocation } = locationSlice.actions;

export default locationSlice.reducer;
