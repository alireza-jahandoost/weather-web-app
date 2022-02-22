import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./dateSlice";
import locationReducer from "./locationSlice";
import weatherReducer from "./weatherSlice";

export const reducer = {
  date: dateReducer,
  weather: weatherReducer,
  location: locationReducer,
};

const store = configureStore({
  reducer,
});

export default store;
