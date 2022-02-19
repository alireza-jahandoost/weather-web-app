import { screen, render } from "@testing-library/react";
import LocationInput from "./location-input.component";
import { randomString } from "../../utilities";
import userEvent from "@testing-library/user-event";

test("should throw error if onChange is not a function", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  const value = randomString();
  const mockedOnChange = randomString();
  expect(() =>
    render(<LocationInput value={value} onChange={mockedOnChange} />)
  ).toThrow();
});

test("should throw error if value is not a string", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  const value = { value: randomString() };
  const mockedOnChange = jest.fn();
  expect(() =>
    render(<LocationInput value={value} onChange={mockedOnChange} />)
  ).toThrow();
});

test("should show the specific value", () => {
  const value = randomString();
  const mockedOnChange = jest.fn();

  render(<LocationInput value={value} onChange={mockedOnChange} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveValue(value);
});

test("should call onChange function on change", () => {
  const value = randomString();
  const mockedOnChange = jest.fn();

  render(<LocationInput value={""} onChange={mockedOnChange} />);

  const input = screen.getByRole("textbox");

  userEvent.clear(input);
  userEvent.type(input, value);

  expect(mockedOnChange).toHaveBeenCalledTimes(value.length);
  for (let i = 0; i < value.length; i++) {
    expect(mockedOnChange).toHaveBeenCalledWith(value[i]);
  }
});

test("should be disabled if disabled property is equal to true", () => {
  const value = randomString();
  const mockedOnChange = jest.fn();

  render(
    <LocationInput value={""} onChange={mockedOnChange} disabled={true} />
  );

  const input = screen.getByRole("textbox");
  expect(input).toBeDisabled();
});

test("should show the error if it exists", () => {
  const errorMessage = randomString();
  const mockedOnChange = jest.fn();

  render(
    <LocationInput
      value={""}
      onChange={mockedOnChange}
      errorMessage={errorMessage}
    />
  );

  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});
