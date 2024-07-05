const { describe, expect, test } = require("@jest/globals");

const dayjs = require("dayjs");
const R = require("ramda");

const { preprocess } = require("./app");

const {
  calculateBasePointsByRecords,
  calculateWeekendBonusPoints,
  calculateTotalScoreIncludingWeekendBonus,
  calculate1AMTo2AMBonusPoints,
  calculateTotalScoreIncluding1AMTo2AMBonus,
  calculateGroupStudyBonusPoints,
  calculateTotalScoreIncludingGroupStudyBonus,
  calculateNonMainFieldStudyBonusPoints,
  calculateTotalScoreIncludingNonMainFieldStudyBonus,
  calculateConferenceJoinedBonusPoints,
  calculateTotalScoreIncludingConferenceJoinedBonus,
} = require("./utils");

describe("preprocess", () => {
  beforeEach(() => {
    jest.resetModules();
    const fixedDate = '2024-07-05';
    jest.mock('dayjs', () => {
      const actualDayjs = jest.requireActual('dayjs');
      return jest.fn(() => actualDayjs(fixedDate));
    });
  });

  afterEach(() => {
    jest.dontMock('dayjs');
  });

  test("빈 배열인 경우, 빈 배열을 반환한다.", () => {
    const allUsers = [
      {
        userName: "A",
        eventJobName: "바바리안",
        targetScore: 15,
        calculateBasePointsByRecords,
        calculateBonusPointsByRecords: calculateWeekendBonusPoints,
        calculateTotalScoreByRecords: calculateTotalScoreIncludingWeekendBonus,
      },
    ];
    const expected = preprocess(allUsers, []);
    expect(expected).toEqual([]);
  });

  test("전체 시나리오", () => {
    const allUsers = [
      {
        userName: "A",
        eventJobName: "바바리안",
        targetScore: 15,
        calculateBasePointsByRecords,
        calculateBonusPointsByRecords: calculateWeekendBonusPoints,
        calculateTotalScoreByRecords: calculateTotalScoreIncludingWeekendBonus,
      },
      {
        userName: "B",
        eventJobName: "어쎄신",
        targetScore: 15,
        calculateBasePointsByRecords,
        calculateBonusPointsByRecords: calculate1AMTo2AMBonusPoints,
        calculateTotalScoreByRecords: calculateTotalScoreIncluding1AMTo2AMBonus,
      },
      {
        userName: "C",
        eventJobName: "드루이드",
        targetScore: 15,
        calculateBasePointsByRecords,
        calculateBonusPointsByRecords: calculateGroupStudyBonusPoints,
        calculateTotalScoreByRecords:
          calculateTotalScoreIncludingGroupStudyBonus,
      },

      // 아마존 생략

      {
        userName: "E",
        eventJobName: "소서리스",
        targetScore: 15,
        calculateBasePointsByRecords,
        calculateBonusPointsByRecords: calculateNonMainFieldStudyBonusPoints,
        calculateTotalScoreByRecords:
          calculateTotalScoreIncludingNonMainFieldStudyBonus,
      },
      {
        userName: "F",
        eventJobName: "네크로멘서",
        targetScore: 15,
        calculateBasePointsByRecords,
        calculateBonusPointsByRecords: calculateConferenceJoinedBonusPoints,
        calculateTotalScoreByRecords:
          calculateTotalScoreIncludingConferenceJoinedBonus,
      },
    ];

    const allStudyRecords = [
      // A
      {
        // 일요일
        dateStr: "2024-06-30 06:00",
        userName: "A",
        type: "개인공부",
      },
      {
        // 토요일
        dateStr: "2024-06-29 06:00",
        userName: "A",
        type: "개인공부",
      },
      {
        // 토요일
        dateStr: "2024-06-22 06:00",
        userName: "A",
        type: "개인공부",
      },

      // // B
      {
        // 1AM ~ 2AM
        dateStr: "2024-06-28 01:00",
        userName: "B",
        type: "같이공부",
      },
      {
        // 1AM ~ 2AM
        dateStr: "2024-06-29 01:00",
        userName: "B",
        type: "같이공부",
      },
      {
        // 1AM ~ 2AM
        dateStr: "2024-06-30 01:00",
        userName: "B",
        type: "같이공부",
      },

      // // C
      {
        // 같이 공부
        dateStr: "2024-06-28 01:00",
        userName: "C",
        type: "같이공부",
      },
      {
        // 같이 공부
        dateStr: "2024-06-29 01:00",
        userName: "C",
        type: "같이공부",
      },
      {
        // 같이 공부
        dateStr: "2024-06-30 01:00",
        userName: "C",
        type: "같이공부",
      },

      // // D 생략

      // // E
      {
        // 다른분야공부
        dateStr: "2024-06-28 01:00",
        userName: "E",
        type: "다른분야공부",
      },
      {
        // 다른분야공부
        dateStr: "2024-06-29 01:00",
        userName: "E",
        type: "다른분야공부",
      },
      {
        // 다른분야공부
        dateStr: "2024-06-30 01:00",
        userName: "E",
        type: "다른분야공부",
      },

      // // F
      {
        // 컨퍼런스참여
        dateStr: "2024-06-28 01:00",
        userName: "F",
        type: "컨퍼런스참여",
      },
      {
        // 컨퍼런스참여
        dateStr: "2024-06-29 01:00",
        userName: "F",
        type: "컨퍼런스참여",
      },
      {
        // 컨퍼런스참여
        dateStr: "2024-06-30 01:00",
        userName: "F",
        type: "컨퍼런스참여",
      },
    ];

    const expected = preprocess(allUsers, allStudyRecords);
    console.log('expected',expected)
    expect(expected).toEqual(expect.arrayContaining([
      {
        basePoint: 3,
        bonusPoint: 2,
        eventJobName: "바바리안",
        scoreNeeded: 10,
        targetScore: 15,
        totalScore: 5,
        userName: "A",
        daySinceLastStudy: 5,
        lastStudyTime: "2024-06-30 06:00",
      },
      {
        basePoint: 3,
        bonusPoint: 2,
        eventJobName: "어쎄신",
        scoreNeeded: 10,
        targetScore: 15,
        totalScore: 5,
        userName: "B",
        daySinceLastStudy: 5,
        lastStudyTime: "2024-06-30 01:00",
      },
      {
        basePoint: 3,
        bonusPoint: 2,
        eventJobName: "드루이드",
        scoreNeeded: 10,
        targetScore: 15,
        totalScore: 5,
        userName: "C",
        daySinceLastStudy: 5,
        lastStudyTime: "2024-06-30 01:00",

      },
      {
        basePoint: 3,
        bonusPoint: 2,
        eventJobName: "소서리스",
        scoreNeeded: 10,
        targetScore: 15,
        totalScore: 5,
        userName: "E",
        daySinceLastStudy: 5,
        lastStudyTime: "2024-06-30 01:00",
      },
      {
        basePoint: 3,
        bonusPoint: 2,
        eventJobName: "네크로멘서",
        scoreNeeded: 10,
        targetScore: 15,
        totalScore: 5,
        userName: "F",
        daySinceLastStudy: 5,
        lastStudyTime: "2024-06-30 01:00",
      },
    ]));
  });
});
