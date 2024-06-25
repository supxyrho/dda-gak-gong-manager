const { describe, expect, test } = require("@jest/globals");

const { isFrom1AMTill2AM } = require("./utils");

describe("isFrom1AMTill2AM", () => {
  test("23:59 is false", () => {
    const expected = isFrom1AMTill2AM("2024-10-27 23:59");
    expect(expected).toBe(false);
  });

  test("24:00 is true", () => {
    const expected = isFrom1AMTill2AM("2024-10-27 24:00");
    expect(expected).toBe(true);
  });

  test("1:00 is true", () => {
    const expected = isFrom1AMTill2AM("2024-10-27 01:00");
    expect(expected).toBe(true);
  });

  test("1:59 is true", () => {
    const expected = isFrom1AMTill2AM("2024-10-27 01:59");
    expect(expected).toBe(true);
  });

  test("2:00 is true", () => {
    const expected = isFrom1AMTill2AM("2024-10-27 02:00");
    expect(expected).toBe(true);
  });

  test("2:01 is false", () => {
    const expected = isFrom1AMTill2AM("2024-10-27 02:01");
    expect(expected).toBe(false);
  });
});
