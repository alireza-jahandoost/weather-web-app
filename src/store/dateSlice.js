import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  day: "",
  month: "",
  year: "",
  error: null,
};

// notice: the month in states must be between 0 - 11
//         like Date object

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    updateDate: (state, action) => {
      const { day, month, year } = action.payload;

      const date = new Date(year, month, day);

      if (date.getTime() < Date.now() - 50 * 365 * 24 * 60 * 60 * 1000) {
        state.error = "The Date must not be before the last 50 years";
      } else if (date.getTime() > Date.now() + 14 * 24 * 60 * 60 * 1000) {
        state.error = "The Date must not be after the next 14 days";
      } else {
        state.day = day;
        state.month = month;
        state.year = year;
        state.error = null;
      }
    },
  },
});

export const { updateDate } = dateSlice.actions;

export default dateSlice.reducer;
