const { describe, expect, test } = require("@jest/globals");

const {
  isFrom1AMTill2AM,
  calculateTotalScoreIncludingWeekendBonus,
  calculateTotalScoreIncluding1AMTo2AMBonus,
  calculateTotalScoreIncludingGroupStudyBonus,
  calculateTotalScoreIncludingNonMainFieldStudyBonus,
  calculateTotalScoreIncludingConferenceJoinedBonus,
  calculateBonusPointsByRecords,
} = require("./utils");

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

describe("calculateBonusPointsByRecords", () => {
  test("빈 배열이 인자인 경우, 0을 반환한다.", () => {
    const arg = [];

    const expected = calculateBonusPointsByRecords(arg);

    expect(expected).toBe(0);
  });

  test("보너스 조건으로 1개 성립 시, 1을 반환한다.", () => {
    const arg = [
      {
        type: "컨퍼런스참여",
        // 평일 월
        dateStr: "2024-09-30",
      },
      {
        type: "개인학습",
        // 평일 월
        dateStr: "2024-09-30",
      },
      // {
      //   type: "개인학습",
      // },
    ];

    const expected = calculateBonusPointsByRecords(arg);

    expect(expected).toBe(1);
  });

  test("보너스 조건으로 2개 이상 성립 시, 최대인 2를 반환한다.", () => {
    const arg = [
      {
        type: "컨퍼런스참여",
        // 평일 월
        dateStr: "2024-09-30",
      },
      {
        type: "컨퍼런스참여",
        // 평일 월
        dateStr: "2024-09-30",
      },
      {
        type: "같이공부",
        // 평일 월
        dateStr: "2024-09-30",
      },
    ];

    const expected = calculateBonusPointsByRecords(arg);

    expect(expected).toBe(2);
  });

  test("1개의 요소가 컨퍼런스 참여와 주말인 조건을 동시 포함시에도, 1을 반환한다.", () => {
    const arg = [
      {
        type: "컨퍼런스참여",
        // 주말인 일요일
        dateStr: "2024-10-06",
      },
    ];

    const expected = calculateBonusPointsByRecords(arg);

    expect(expected).toBe(1);
  });
});
