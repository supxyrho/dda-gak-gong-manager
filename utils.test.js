const { describe, expect, test } = require("@jest/globals");

const { 
  isFrom1AMTill2AM, 
  calculateTotalScoreIncludingWeekendBonus,
  calculateTotalScoreIncluding1AMTo2AMBonus,
  calculateTotalScoreIncludingGroupStudyBonus
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

describe('calculateTotalScoreIncludingWeekendBonus', ()=> {
  test("목록 중 날짜가 주말인 요소가 0개 한 경우, 총 배열 갯수 + 0 (주말 공부 횟수) 를 반환한다.",() => {
    const arg = [
      {
        // 금요일
        dateStr: "2024-06-28 ",
      },
      {
        // 목요일
        dateStr: "2024-06-27",
      },
      {
        // 수요일
        dateStr: "2024-06-26",
      }
    ]

    const expected = calculateTotalScoreIncludingWeekendBonus(arg)
    expect(expected).toBe(arg.length)
  })

  test("목록 중 날짜가 주말인 갯수가 1인 경우, 총 배열 갯수 + 1 (주말 갯수) 를 반환한다.",() => {

    const arg = [
    {
      // 토요일
      dateStr: "2024-06-29",
    },
    {
      // 금요일
      dateStr: "2024-06-28 ",
    },
    {
      // 목요일
      dateStr: "2024-06-27",
    }]

    const expected = calculateTotalScoreIncludingWeekendBonus(arg)

    expect(expected).toBe(arg.length + 1)
  })

  test("목록 중 날짜가 주말인 갯수가 2인 경우, 총 배열 갯수 + 2 (주말 갯수) 를 반환한다.",() => {
    const arg = [
      {
        // 일요일
        dateStr: "2024-06-30 ",
      },
      {
        // 토요일
        dateStr: "2024-06-29",
      },
      {
        // 금요일수
      },
    ]

    const expected = calculateTotalScoreIncludingWeekendBonus(arg)
    expect(expected).toBe(arg.length + 2)
  })

  test("목록 중 날짜가 주말인 갯수가 3인 경우, 총 배열 갯수 + 2 (최대 주말 적용 갯수는 2) 를 반환한다.",() => {
    const arg = [
      {
        // 일요일
        dateStr: "2024-06-30 ",
      },
      {
        // 토요우
        dateStr: "2024-06-29",
      },
      {
        // 토요일
        dateStr: "2024-06-22 ",
      },
    ]

    const expected = calculateTotalScoreIncludingWeekendBonus(arg)
    expect(expected).toBe(arg.length + 2)
  })
})


describe('calculateTotalScoreIncluding1AMTo2AMBonus', ()=> {
  test("목록 중 1AM ~ 2AM인 요소의 갯수가 0인 경우, 총 배열 갯수 + 0 (주말 공부 횟수) 를 반환한다.",() => {
    const arg = [
      {
        dateStr: "2024-06-28 12:59",
      },
      {
        dateStr: "2024-06-27 02:01 ",
      },
    ]

    const expected = calculateTotalScoreIncluding1AMTo2AMBonus(arg)
    expect(expected).toBe(arg.length)
  })

  test("목록 중 1AM ~ 2AM인 요소의 갯수가 1인 경우, 총 배열 갯수 + 1 를 반환한다.",() => {
    const arg = [
      {
        dateStr: "2024-06-29 12:59",
      },
      {
        // 1AM ~ 2AM 
        dateStr: "2024-06-28 02:00 ",
      },
      {
        dateStr: "2024-06-27 02:01",
      }
    ]

    const expected = calculateTotalScoreIncluding1AMTo2AMBonus(arg)
    expect(expected).toBe(arg.length + 1)
  })

  test("목록 중 1AM ~ 2AM인 요소의 갯수가 2인 경우, 총 배열 갯수 + 2 를 반환한다.",() => {
    const arg = [
      {
        dateStr: "2024-06-29 12:59",
      },
      {
        // 1AM ~ 2AM 
        dateStr: "2024-06-28 01:00 ",
      },
      {
        // 1AM ~ 2AM 
        dateStr: "2024-06-27 02:00 ",
      },
      {
        dateStr: "2024-06-26 02:01",
      }
    ]

    const expected = calculateTotalScoreIncluding1AMTo2AMBonus(arg)
    expect(expected).toBe(arg.length + 2)
  })

  test("목록 중 1AM ~ 2AM인 요소의 갯수가 3인 경우, 총 배열 갯수 + 2 (최대 적용 횟수는 2) 를 반환한다.",() => {
    const arg = [
      {
        dateStr: "2024-06-29 12:59",
      },
      {
        // 1AM ~ 2AM 
        dateStr: "2024-06-28 01:00 ",
      },
      {
        // 1AM ~ 2AM 
        dateStr: "2024-06-28 01:59 ",
      },
      {
        // 1AM ~ 2AM 
        dateStr: "2024-06-27 02:00",
      },
      {
        dateStr: "2024-06-27 02:01",
      }
    ]

    const expected = calculateTotalScoreIncluding1AMTo2AMBonus(arg)
    expect(expected).toBe(arg.length + 2)
  })
})


describe('calculateTotalScoreIncludingGroupStudyBonus', ()=> {
  test("목록 중 type이 *같이공부*의 갯수가 0인 경우, 총 배열 갯수 + 0 (주말 공부 횟수) 를 반환한다.",() => {
    const arg = [
      {
        type: '개별공부',
      },
      {
        type: '개별공부',
      }
    ]

    const expected = calculateTotalScoreIncludingGroupStudyBonus(arg)
    expect(expected).toBe(arg.length)
  })

  test("목록 중 type이 *같이공부*의 갯수가 1인 경우, 총 배열 갯수 + 1 를 반환한다.",() => {
    const arg = [
      {
        // 같이 공부
        type: '같이공부',
      },
      {
        type: '개별공부',
      },
      {
        type: '개별공부',
      }
    ]

    const expected = calculateTotalScoreIncludingGroupStudyBonus(arg)
    expect(expected).toBe(arg.length + 1)
  })

  test("목록 중 type이 *같이공부*의 갯수가 2인 경우, 총 배열 갯수 + 2 를 반환한다.",() => {
    const arg = [
      {
        // 같이 공부
        type: '같이공부',
      },
      {
        type: '같이공부',
      },
      {
        type: '개별공부',
      }
    ]

    const expected = calculateTotalScoreIncludingGroupStudyBonus(arg)
    expect(expected).toBe(arg.length + 2)
  })

  test("목록 중 type이 *같이공부*의 갯수가 3인 경우, 총 배열 갯수 + 2 (최대 적용 횟수는 2) 를 반환한다.",() => {
    const arg = [
      {
        // 같이 공부
        type: '같이공부',
      },
      {
        type: '같이공부',
      },
      {
        type: '같이공부',
      }
    ]

    const expected = calculateTotalScoreIncludingGroupStudyBonus(arg)
    expect(expected).toBe(arg.length + 2)
  })
})