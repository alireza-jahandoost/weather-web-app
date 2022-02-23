import { render, screen } from "@testing-library/react";
import WeatherImage from "./weather-image.component";

test("should return clear-day image if icon does not exist", () => {
  render(<WeatherImage iconType="unknown" />);
  expect(screen.getByRole("img", { name: /clear-day/i })).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(1);
});

test("should return iconType image if icon does exist", () => {
  render(<WeatherImage iconType="rain-snow" />);
  expect(screen.getByRole("img", { name: /rain-snow/i })).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(1);
});

test("should return clear-day image if icon was undefined", () => {
  render(<WeatherImage />);
  expect(screen.getByRole("img", { name: /clear-day/i })).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(1);
});
