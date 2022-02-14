import weatherReducer, {
  updateWeather,
  keys,
  initialState,
} from "../weatherSlice";

const actionsName = { updateWeather: "weather/updateWeather" };

describe("check weather actions", () => {
  describe("check updateWeather action", () => {
    const weatherObj = keys.reduce(
      (obj, current) => ({
        ...obj,
        [current]: current,
      }),
      {}
    );
    test(`updateWeather action must return object with type: ${actionsName.updateWeather}`, () => {
      const returned = updateWeather(weatherObj);

      expect(returned.type).toBe(actionsName.updateWeather);
    });

    test("updateWeather action must return object with payload key", () => {
      const returned = updateWeather(weatherObj);

      expect(returned.payload).toEqual(weatherObj);
    });
  });
});

describe("check weather reducer", () => {
  describe("check updateWeather action", () => {
    test("the properties of weather that exists in payload must be changed and other properties must be set as null", () => {
      const availableProperties = keys.slice(0, keys.length / 2);
      const unavailableProperties = keys.slice(keys.length / 2);

      const payload = availableProperties.reduce(
        (obj, current) => ({ ...obj, [current]: current }),
        {}
      );

      const action = { type: actionsName.updateWeather, payload };

      const newState = weatherReducer(initialState, action);

      expect(newState).toEqual({
        ...payload,
        ...unavailableProperties.reduce(
          (obj, current) => ({ ...obj, [current]: null }),
          {}
        ),
      });
    });
  });
});
