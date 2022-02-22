import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider as ReduxProvider } from "react-redux";

export const wrapIntoRedux = ({ reducers, component }) => {
  if (!React.isValidElement(component)) {
    throw new Error(
      "the component of wrapIntoRedux function must be a valid component"
    );
  }

  if (typeof reducers !== "object") {
    throw new Error("the reducers of wrapIntoRedux function must be an object");
  }

  const store = configureStore({ reducer: reducers });
  return {
    wrappedComponent: <ReduxProvider store={store}>{component}</ReduxProvider>,
    store,
  };
};
