import isLoadingReducer, { loadingBegin, loadingEnd } from "../isLoadingSlice";

const actionsName = {
  loadingBegin: "isLoading/loadingBegin",
  loadingEnd: "isLoading/loadingEnd",
};

describe("check isLoading actions", () => {
  describe("check loadingBegin action", () => {
    test(`loadingBegin action must return an object with type: ${actionsName.loadingBegin}`, () => {
      expect(loadingBegin()).toEqual({ type: actionsName.loadingBegin });
    });

    test(`loadingEnd action must return an object with type: ${actionsName.loadingEnd}`, () => {
      expect(loadingEnd()).toEqual({ type: actionsName.loadingEnd });
    });
  });
});

describe("check isLoading reducer", () => {
  describe("check for loadingBegin action", () => {
    test("when loadingBegin dispatched, the isLoading property must be changed to true", () => {
      expect(isLoadingReducer(false, loadingBegin())).toBe(true);
    });
  });
  describe("check for loadingEnd action", () => {
    test("when loadingEnd dispatched, the isLoading property must be changed to false", () => {
      expect(isLoadingReducer(true, loadingEnd())).toBe(false);
    });
  });
});
