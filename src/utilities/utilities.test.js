import { formatDate } from ".";

describe("check formatDate function", () => {
  test("check when month and day is lower than 10", () => {
    expect(formatDate(new Date(2022, 4, 1))).toBe("2022-05-01");
  });
  test("check when month and day is not lower than 10", () => {
    expect(formatDate(new Date(2022, 11, 12))).toBe("2022-12-12");
  });
});
