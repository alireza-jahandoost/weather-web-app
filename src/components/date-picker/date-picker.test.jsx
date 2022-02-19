import { render, screen } from "@testing-library/react";
import DatePicker from "./date-picker.component";
import userEvent from "@testing-library/user-event";
import { randomString, formatDate } from "../../utilities";

test("if value is not in a good format, the component must throw an error", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  const fakeOnChange = jest.fn();
  expect(() =>
    render(<DatePicker value="2022-1-1" onChange={fakeOnChange} />)
  ).toThrow();
});

test("if onChange is not a function, the component must throw an error", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  expect(() =>
    render(<DatePicker value="2022-11-11" onChange={"something"} />)
  ).toThrow();
});

test("the initial value of input must be equal to value property", () => {
  const date = "2021-02-02";
  const fakeOnChange = jest.fn();
  render(<DatePicker value={date} onChange={fakeOnChange} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveValue(date);
});

test("on Change, the onChange function must be called with new Date", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  const date = "2022-02-19";
  const fakeOnChange = jest.fn();
  render(<DatePicker value={date} onChange={fakeOnChange} />);

  const input = screen.getByRole("textbox");
  userEvent.click(input);

  const dayOfMonth = screen.getByRole("button", {
    name: "11",
  });
  userEvent.click(dayOfMonth);

  const okButton = screen.getByText(/ok/i);
  userEvent.click(okButton);

  expect(fakeOnChange).toHaveBeenCalledTimes(1);
  const changedDate = new Date(fakeOnChange.mock.calls[0][0]);

  expect(changedDate.getDate()).toBe(11);
  expect(changedDate.getMonth()).toBe(1);
  expect(changedDate.getFullYear()).toBe(2022);
});

test("should show error if exists", () => {
  const date = "2022-02-19";
  const errorMessage = randomString(40);
  const fakeOnChange = jest.fn();
  render(
    <DatePicker
      value={date}
      onChange={fakeOnChange}
      errorMessage={errorMessage}
    />
  );

  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});

test("should not change if disabled", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  const date = "2022-02-19";
  const fakeOnChange = jest.fn();
  render(<DatePicker disabled={true} value={date} onChange={fakeOnChange} />);

  const input = screen.getByRole("textbox");
  userEvent.click(input);

  expect(
    screen.queryByRole("button", {
      name: "11",
    })
  ).not.toBeInTheDocument();
});
