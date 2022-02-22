import { render, screen } from "@testing-library/react";
import App from "./App";
import { wrapIntoRedux } from "./testing-utilities";
import { reducer } from "./store";

test("App should render correctly", () => {
  render(
    wrapIntoRedux({ component: <App />, reducers: reducer }).wrappedComponent
  );
});
