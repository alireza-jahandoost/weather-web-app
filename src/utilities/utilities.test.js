import { formatDate, randomString } from ".";

describe("check formatDate function", () => {
  test("check when month and day is lower than 10", () => {
    expect(formatDate(new Date(2022, 4, 1))).toBe("2022-05-01");
  });
  test("check when month and day is not lower than 10", () => {
    expect(formatDate(new Date(2022, 11, 12))).toBe("2022-12-12");
  });
  test("formatDate should throw an error if the input was not a date instance", () => {
    expect(() => formatDate(2022, 1, 1)).toThrow();
    expect(() => formatDate("2022-01-01")).toThrow();
  });
});

describe("check randomString function", () => {
  test("the default length must be 8", () => {
    expect(randomString().length).toBe(8);
  });
  test("if the function has a length, the string' length must be equal to that", () => {
    expect(randomString(15).length).toBe(15);
  });
  test("the strings must be random", () => {
    const firstString = randomString(10);
    const secondString = randomString(10);
    expect(firstString).not.toBe(secondString);
  });
});
