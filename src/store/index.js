import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./dateSlice";
import locationReducer from "./locationSlice";
import weatherReducer from "./weatherSlice";
import isLoadingReducer from "./isLoadingSlice";

const store = configureStore({
  reducer: {
    date: dateReducer,
    weather: weatherReducer,
    location: locationReducer,
    isLoading: isLoadingReducer,
  },
});

export default store;
