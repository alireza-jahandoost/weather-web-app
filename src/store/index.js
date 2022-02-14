import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./dateSlice";
import locationReducer from "./locationSlice";
import weatherReducer from "./weatherSlice";

const store = configureStore({
  reducer: {
    date: dateReducer,
    weather: weatherReducer,
    location: locationReducer,
  },
});

export default store;
