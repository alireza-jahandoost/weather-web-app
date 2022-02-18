import { waitFor } from "@testing-library/react";
import weatherReducer, {
  updateWeather,
  keys,
  initialState,
  fetchWeather,
} from "../weatherSlice";
import { weatherUrl } from "../../api/urlCreator";
import { KEY } from "../../api/key.js";
import { fakeWeatherResponse } from "../../mocks/fakeResponse";

const actionsName = { updateWeather: "weather/updateWeather" };

describe("check weather actions", () => {});

describe("check weather reducer", () => {
  describe("check fetchWeather thunk's actions", () => {
    test("when fetchWeather.pending is dispatched, the status must be changed to pending", () => {
      expect(weatherReducer(initialState, fetchWeather.pending()).status).toBe(
        "pending"
      );
    });

    test("when fetchWeather.fulfilled is dispatched, the status must be changed to fulfilled and weather must be set", () => {
      const availableProperties = keys.slice(0, keys.length / 2);
      const unavailableProperties = keys.slice(keys.length / 2);

      const newWeather = availableProperties.reduce(
        (obj, current) => ({ ...obj, [current]: current }),
        {}
      );

      expect(
        weatherReducer(
          { ...initialState, status: "pending" },
          fetchWeather.fulfilled(newWeather)
        )
      ).toEqual({
        ...initialState,
        data: {
          ...newWeather,
          ...unavailableProperties.reduce(
            (obj, current) => ({ ...obj, [current]: null }),
            {}
          ),
        },
        status: "fulfilled",
      });
    });

    test("when fetchWeather.rejected is dispatched, the status must be changed to rejected and error must be set", () => {
      const message = "something went wrong";
      expect(
        weatherReducer(
          { ...initialState, status: "pending" },
          fetchWeather.rejected({ message })
        )
      ).toEqual({
        ...initialState,
        status: "rejected",
        error: message,
      });
    });
  });
});

describe("check weather thunks", () => {
  describe("check fetchWeather thunk", () => {
    test("when fetchWeather called, the fetch function must be called with correct url", async () => {
      const mockedDispatch = jest.fn();
      const mockedFetch = jest
        .spyOn(window, "fetch")
        .mockImplementation(() => {});

      const date = "2022-01-01";
      const location = "mashhad";

      fetchWeather({ date, location })(mockedDispatch);

      expect(mockedFetch).toHaveBeenCalledTimes(1);
      expect(mockedFetch).toHaveBeenCalledWith(
        weatherUrl({ date, location, key: KEY })
      );
    });

    test("if request was successful, fetchWeather.pending and fetchWeather.fulfilled must be dispatched", async () => {
      const mockedDispatch = jest.fn();
      const date = "2022-01-01";
      const location = "mashhad";

      const func = fetchWeather({ date, location });
      func(mockedDispatch);

      await waitFor(() => expect(mockedDispatch).toHaveBeenCalledTimes(2));
      expect(mockedDispatch.mock.calls[0][0]["type"]).toBe(
        fetchWeather.pending().type
      );
      expect(mockedDispatch.mock.calls[0][0]["payload"]).toBe(
        fetchWeather.pending().payload
      );

      expect(mockedDispatch.mock.calls[1][0]["type"]).toBe(
        fetchWeather.fulfilled(
          fakeWeatherResponse({ address: "mashhad", datetime: "2022-01-01" })
        ).type
      );
      expect(mockedDispatch.mock.calls[1][0]["payload"]).toEqual(
        fetchWeather.fulfilled(
          fakeWeatherResponse({ address: "mashhad", datetime: "2022-01-01" })
        ).payload
      );
    });

    test("if request was rejected, fetchWeather.pending and fetchWeather.rejected must be dispatched", async () => {
      const mockedDispatch = jest.fn();
      const date = "2022-01-01";
      const location = "no-where";

      const func = fetchWeather({ date, location });
      func(mockedDispatch);

      await waitFor(() => expect(mockedDispatch).toHaveBeenCalledTimes(2));
      expect(mockedDispatch.mock.calls[0][0]["type"]).toBe(
        fetchWeather.pending().type
      );
      expect(mockedDispatch.mock.calls[0][0]["payload"]).toBe(
        fetchWeather.pending().payload
      );

      expect(mockedDispatch.mock.calls[1][0]["type"]).toBe(
        fetchWeather.rejected({ message: "something went wrong" }).type
      );
      expect(mockedDispatch.mock.calls[1][0]["payload"]).toBe(
        fetchWeather.rejected({ message: "something went wrong" }).payload
      );
    });
  });
});
