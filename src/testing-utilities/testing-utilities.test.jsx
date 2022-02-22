import React from "react";
import { render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { wrapIntoRedux, wait } from ".";

const testReducer = (state = {}, action) => {
  return state;
};

describe("test wrapIntoRedux", () => {
  const TestComponent = () => {
    const dispatch = useDispatch();
    return null;
  };

  test("should return an jsx element in wrappedComponent property", () => {
    const element = wrapIntoRedux({
      component: <TestComponent />,
      reducers: { test: testReducer },
    }).wrappedComponent;

    expect(React.isValidElement(element)).toBeTruthy();
  });

  test("should wrap the component into redux provider", () => {
    expect(() =>
      render(
        wrapIntoRedux({
          component: <TestComponent />,
          reducers: { test: testReducer },
        }).wrappedComponent
      )
    ).not.toThrow();
  });

  test("should throw if component is not a react element", () => {
    expect(() =>
      render(
        wrapIntoRedux({
          component: "not element",
          reducers: { test: testReducer },
        })
      )
    ).toThrow();
  });

  test("should throw if redux is not an object", () => {
    expect(() =>
      render(
        wrapIntoRedux({
          component: <TestComponent />,
          reducers: testReducer,
        })
      )
    ).toThrow();
  });

  test("should return an object", () => {
    expect(
      typeof wrapIntoRedux({
        component: <TestComponent />,
        reducers: { test: testReducer },
      })
    ).toBe("object");
  });

  test("should have store and wrappedComponent properties", () => {
    const returnedValue = wrapIntoRedux({
      component: <TestComponent />,
      reducers: { test: testReducer },
    });

    expect(returnedValue).toHaveProperty("store");
    expect(returnedValue).toHaveProperty("wrappedComponent");
  });
});

describe("test wait", () => {
  describe("should wait for specific time", () => {
    test("when delay is 500", async () => {
      const first = window.performance.now();
      const delay = 500;
      await wait(delay);
      const second = window.performance.now();
      expect(second - first).toBeGreaterThan(delay - 50);
      expect(second - first).toBeLessThan(delay + 50);
    });
    test("when delay is 1000", async () => {
      const first = window.performance.now();
      const delay = 1000;
      await wait(delay);
      const second = window.performance.now();
      expect(second - first).toBeGreaterThan(delay - 50);
      expect(second - first).toBeLessThan(delay + 50);
    });
    test("when delay is 1500", async () => {
      const first = window.performance.now();
      const delay = 1500;
      await wait(delay);
      const second = window.performance.now();
      expect(second - first).toBeGreaterThan(delay - 50);
      expect(second - first).toBeLessThan(delay + 50);
    });
  });
});
