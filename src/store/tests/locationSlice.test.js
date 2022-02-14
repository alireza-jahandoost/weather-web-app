import locationReducer, {
  updateLocation,
  initialState,
} from "../locationSlice";

const actionsName = { updateLocation: "location/updateLocation" };

const newLocation = {
  location: "new location",
  latitude: 1,
  longitude: 1,
};

describe("check location actions", () => {
  describe("check updateLocation action", () => {
    test(`updateLocation action must return an object with type: ${actionsName.updateLocation}`, () => {
      const returned = updateLocation(newLocation);
      expect(returned.type).toBe(actionsName.updateLocation);
    });

    test("updateLocation action must return an object with payload: newLocationName", () => {
      const returned = updateLocation(newLocation);
      expect(returned.payload).toEqual(newLocation);
    });
  });
});

describe("check location reducer", () => {
  describe("check for updateLocation action", () => {
    test("the location property must be changed to payload's value", () => {
      expect(
        locationReducer(initialState, updateLocation(newLocation))
      ).toEqual(newLocation);
    });
  });
});
