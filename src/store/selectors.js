import { createSelector } from "@reduxjs/toolkit";
import { formatDate } from "../utilities";

const locationObjectSelector = (state) => state.location;

export const locationSelector = createSelector(
  locationObjectSelector,
  (locationObject) => locationObject.location
);
export const latitudeSelector = createSelector(
  locationObjectSelector,
  (locationObject) => locationObject.latitude
);
export const longitudeSelector = createSelector(
  locationObjectSelector,
  (locationObject) => locationObject.longitude
);

const dateObjectSelector = (state) => state.date;

export const dateSelector = createSelector(
  dateObjectSelector,
  ({ day, month, year }) => ({ day, month, year })
);
export const stringedDateSelector = createSelector(
  dateObjectSelector,
  ({ day, month, year }) => formatDate(new Date(year, month - 1, day))
);
export const dateErrorSelector = createSelector(
  dateObjectSelector,
  ({ error }) => error
);

const weatherObjectSelector = (state) => state.weather;

export const weatherDataSelector = createSelector(
  weatherObjectSelector,
  (weather) => weather.data
);
export const weatherStatusSelector = createSelector(
  weatherObjectSelector,
  (weather) => weather.status
);
export const weatherErrorSelector = createSelector(
  weatherObjectSelector,
  ({ error }) => error
);
