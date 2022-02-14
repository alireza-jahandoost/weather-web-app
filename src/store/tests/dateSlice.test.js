import dateReducer, { updateDate } from "../dateSlice";

const actionsName = { updateDate: "date/updateDate" };

describe("test actions of dateSlice", () => {
  describe("test updateDate action", () => {
    const pastDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);

    test(`updateDate action must return {type: ${actionsName.updateDate}}`, () => {
      const returned = updateDate({
        day: pastDate.getDate(),
        month: pastDate.getMonth(),
        year: pastDate.getFullYear(),
      });
      expect(returned.type).toBe(actionsName.updateDate);
    });

    test("updateDate action must return {payload: {day, month, year}}", () => {
      const obj = {
        day: pastDate.getDate(),
        month: pastDate.getMonth(),
        year: pastDate.getFullYear(),
      };
      const returned = updateDate({ ...obj });
      expect(returned.payload).toEqual({ ...obj });
    });
  });
});

describe("check reducer", () => {
  const validDate = new Date(Date.now());

  const initialState = {
    day: validDate.getDate(),
    month: validDate.getMonth(),
    year: validDate.getFullYear(),
    error: null,
  };

  describe("check updateDate action", () => {
    describe("check error messages", () => {
      test("the error message of before last 50 years and after 14 days must not be equal", () => {
        const firstDate = new Date(Date.now() - 51 * 365 * 24 * 60 * 60 * 1000);

        const firstPayload = {
          day: firstDate.getDate(),
          month: firstDate.getMonth(),
          year: firstDate.getFullYear(),
        };

        const firstAction = {
          type: actionsName.updateDate,
          payload: firstPayload,
        };

        const secondDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

        const secondPayload = {
          day: secondDate.getDate(),
          month: secondDate.getMonth(),
          year: secondDate.getFullYear(),
        };

        const secondAction = {
          type: actionsName.updateDate,
          payload: secondPayload,
        };

        expect(
          dateReducer({ ...initialState, error: null }, firstAction).error
        ).not.toBe(
          dateReducer({ ...initialState, error: null }, secondAction).error
        );
      });
    });

    describe("check before the last 50 years", () => {
      const date = new Date(Date.now() - 51 * 365 * 24 * 60 * 60 * 1000);

      const payload = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };

      const action = { type: actionsName.updateDate, payload };

      test("if current state has not had any error, the error must be set", () => {
        const newState = dateReducer({ ...initialState, error: null }, action);
        expect(newState.error).not.toBe(null);
      });

      test("if current state has had an error, the error must be updated", () => {
        const newState = dateReducer(
          { ...initialState, error: "last error" },
          action
        );
        expect(newState.error).not.toBe("last error");
      });

      test("the current state's date must not be changed", () => {
        const newState = dateReducer(
          { ...initialState, error: "last error" },
          action
        );
        expect(newState.day).toBe(initialState.day);
        expect(newState.month).toBe(initialState.month);
        expect(newState.year).toBe(initialState.year);
      });
    });

    describe("check after the last 50 years", () => {
      const date = new Date(Date.now() - 40 * 365 * 24 * 60 * 60 * 1000);

      const payload = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };

      const action = { type: actionsName.updateDate, payload };

      test("if current state has not had any error, the error must not be set", () => {
        const newState = dateReducer({ ...initialState, error: null }, action);
        expect(newState.error).toBe(null);
      });

      test("if current state has had an error, the error must be updated to null", () => {
        const newState = dateReducer(
          { ...initialState, error: "last error" },
          action
        );
        expect(newState.error).toBe(null);
      });

      test("the current state's date must be changed", () => {
        const newState = dateReducer(
          { ...initialState, error: "last error" },
          action
        );
        expect(newState.day).toBe(payload.day);
        expect(newState.month).toBe(payload.month);
        expect(newState.year).toBe(payload.year);
      });
    });

    describe("check before the next 14 days", () => {
      const date = new Date(Date.now() + 13 * 24 * 60 * 60 * 1000);

      const payload = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };

      const action = { type: actionsName.updateDate, payload };

      test("if current state has not had any error, the error must not be set", () => {
        const newState = dateReducer({ ...initialState, error: null }, action);
        expect(newState.error).toBe(null);
      });

      test("if current state has had an error, the error must be updated to null", () => {
        const newState = dateReducer(
          { ...initialState, error: "last error" },
          action
        );
        expect(newState.error).toBe(null);
      });

      test("the current state's date must be changed", () => {
        const newState = dateReducer(
          { ...initialState, error: "last error" },
          action
        );
        expect(newState.day).toBe(payload.day);
        expect(newState.month).toBe(payload.month);
        expect(newState.year).toBe(payload.year);
      });
    });

    describe("check after the next 14 days", () => {
      const date = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

      const payload = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };

      const action = { type: actionsName.updateDate, payload };

      test("if current state has not had any error, the error must be set", () => {
        const newState = dateReducer({ ...initialState, error: null }, action);
        expect(newState.error).not.toBe(null);
      });

      test("if current state has had an error, the error must be updated", () => {
        const newState = dateReducer(
          { ...initialState, error: "last error" },
          action
        );
        expect(newState.error).not.toBe("last error");
      });

      test("the current state's date must not be changed", () => {
        const newState = dateReducer(
          { ...initialState, error: "last error" },
          action
        );
        expect(newState.day).toBe(initialState.day);
        expect(newState.month).toBe(initialState.month);
        expect(newState.year).toBe(initialState.year);
      });
    });
  });
});
