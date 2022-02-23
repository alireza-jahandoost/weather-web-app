import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
import { wrapIntoRedux, wait } from "../../testing-utilities";
import Weather from "./weather.component";
import * as weatherSlice from "../../store/weatherSlice";
import weatherReducer from "../../store/weatherSlice";
import { defaultLocation, defaultDate } from "./weather.component";
import { formatDate } from "../../utilities";
import { reducer } from "../../store";

test("should dispatch the fetchWeather thunk when component renders", async () => {
  const mockedFetchWeather = jest
    .spyOn(weatherSlice, "fetchWeather")
    .mockImplementation(() => {});

  const { wrappedComponent, store } = wrapIntoRedux({
    component: <Weather />,
    reducers: reducer,
  });

  const mockedDispatch = jest
    .spyOn(store, "dispatch")
    .mockImplementation(() => {});

  render(wrappedComponent);

  await waitFor(() => expect(mockedFetchWeather).toHaveBeenCalledTimes(1));
  expect(mockedDispatch).toHaveBeenCalledTimes(1);
  expect(mockedFetchWeather).toHaveBeenCalledWith({
    location: defaultLocation,
    date: defaultDate,
  });
});

test("should dispatch the fetchWeather thunk when date changes", async () => {
  const mockedFetchWeather = jest
    .spyOn(weatherSlice, "fetchWeather")
    .mockImplementation(() => {});

  const { wrappedComponent, store } = wrapIntoRedux({
    component: <Weather />,
    reducers: reducer,
  });

  const mockedDispatch = jest
    .spyOn(store, "dispatch")
    .mockImplementation(() => {});

  render(wrappedComponent);
  await wait(500);

  const dateInput = screen.getByRole("textbox", { name: /choose date/i });
  userEvent.click(dateInput);

  const changedDate =
    new Date(Date.now()).getDate() === 1
      ? new Date(Date.now() + 24 * 60 * 60 * 1000)
      : new Date(Date.now() - 24 * 60 * 60 * 1000);

  const buttonLabel = format(changedDate, "MMM d, yyyy");

  const button = screen.getByRole("button", { name: buttonLabel });
  userEvent.click(button);

  const yesButton = screen.getByText(/ok/i);
  userEvent.click(yesButton);

  await waitFor(() => expect(mockedFetchWeather).toHaveBeenCalledTimes(2));
  await waitFor(() => expect(mockedDispatch).toHaveBeenCalledTimes(2));
  await waitFor(() =>
    expect(mockedFetchWeather).toHaveBeenCalledWith({
      location: defaultLocation,
      date: formatDate(changedDate),
    })
  );
});

test("should dispatch the fetchWeather thunk when location changes", async () => {
  const mockedFetchWeather = jest
    .spyOn(weatherSlice, "fetchWeather")
    .mockImplementation(() => {});

  const { wrappedComponent, store } = wrapIntoRedux({
    component: <Weather />,
    reducers: reducer,
  });

  const mockedDispatch = jest
    .spyOn(store, "dispatch")
    .mockImplementation(() => {});

  render(wrappedComponent);
  await wait(500);

  const newLocation = "newLocation";

  const LocationInput = screen.getByRole("textbox", { name: /location/i });
  userEvent.clear(LocationInput);
  userEvent.type(LocationInput, newLocation);

  await waitFor(() => expect(mockedFetchWeather).toHaveBeenCalledTimes(2));
  await waitFor(() => expect(mockedDispatch).toHaveBeenCalledTimes(2));
  await waitFor(() =>
    expect(mockedFetchWeather).toHaveBeenCalledWith({
      location: newLocation,
      date: defaultDate,
    })
  );
});

test("should show the error if weather has error", async () => {
  const { wrappedComponent, store } = wrapIntoRedux({
    component: <Weather />,
    reducers: reducer,
  });

  store.dispatch(weatherSlice.fetchWeather.rejected());

  const mockedFetchWeather = jest
    .spyOn(weatherSlice, "fetchWeather")
    .mockImplementation(() => {});

  const mockedDispatch = jest
    .spyOn(store, "dispatch")
    .mockImplementation(() => {});

  render(wrappedComponent);

  await waitFor(() =>
    expect(screen.getByText(weatherSlice.errorMessage)).toBeInTheDocument()
  );
});
