import {
  locationSelector,
  latitudeSelector,
  longitudeSelector,
  dateSelector,
  stringedDateSelector,
  dateErrorSelector,
  weatherDataSelector,
  weatherStatusSelector,
  weatherErrorSelector,
} from "../selectors";
import { randomString, formatDate } from "../../utilities";

const state = {
  location: {
    location: randomString(15),
    latitude: randomString(),
    longitude: randomString(),
  },
  date: {
    day: Math.trunc(Math.random() * 31),
    month: Math.trunc(Math.random() * 12),
    year: Math.trunc(Math.random() * 20) + 2000,
    error: randomString(40),
  },
  weather: {
    data: {
      description: randomString(),
      tempmax: randomString(),
      tempmin: randomString(),
      temp: randomString(),
      feelslike: randomString(),
      humidity: randomString(),
      windspeed: randomString(),
      icon: randomString(),
      pressure: randomString(),
    },
    status: "fulfilled",
    error: randomString(50),
  },
};

test("locationSelector should return location", () => {
  expect(locationSelector(state)).toBe(state.location.location);
});

test("latitudeSelector should return latitude", () => {
  expect(latitudeSelector(state)).toBe(state.location.latitude);
});

test("longitudeSelector should return longitude", () => {
  expect(longitudeSelector(state)).toBe(state.location.longitude);
});

test("dateSelector should return an object with day, month and year", () => {
  expect(dateSelector(state)).toEqual({
    day: state.date.day,
    month: state.date.month,
    year: state.date.year,
  });
});

test("stringedDateSelector should return a string in format yyyy-mm-dd", () => {
  expect(stringedDateSelector(state)).toBe(
    formatDate(new Date(state.date.year, state.date.month, state.date.day))
  );
});

test("dateErrorSelector should return a string as date error", () => {
  expect(dateErrorSelector(state)).toBe(state.date.error);
});

test("weatherDataSelector should return an object with weather properties", () => {
  expect(weatherDataSelector(state)).toEqual({ ...state.weather.data });
});

test("weatherStatusSelector should return an string as status", () => {
  expect(weatherStatusSelector(state)).toBe(state.weather.status);
});

test("weatherErrorSelector should return an string as error", () => {
  expect(weatherErrorSelector(state)).toBe(state.weather.error);
});
