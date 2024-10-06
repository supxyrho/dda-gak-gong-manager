const R = require("ramda");
const dayjs = require("dayjs");

// functional helper
const mapNested = (fn) => R.map(R.map(fn));

// Layer 1
const sortByAscDate = R.sortWith([R.ascend(R.prop("dateStr"))]);
const sortByDescDate = R.sortWith([R.descend(R.prop("dateStr"))]);
const sortByDescTotalScore = R.sortWith([R.descend(R.prop("totalScore"))]);
const formatToDateOnly = (dateStr) =>
  dayjs(dateStr, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");
const uniqueByDay = R.uniqBy(R.pipe(R.prop("dateStr"), formatToDateOnly));
const adjustToPrevDayEnd = R.evolve({
  dateStr: (dateStr) =>
    dayjs(dateStr, "YYYY-MM-DD:HH:mm")
      .subtract(1, "day")
      .set("hour", 23)
      .set("minute", 59)
      .format("YYYY-MM-DD:HH:mm"),
});

const lastStudyTime = R.pipe(sortByAscDate, R.last, R.prop("dateStr"));
const daySinceLastStudy = R.pipe(lastStudyTime, (dateStr) =>
  dayjs().startOf("day").diff(dayjs(dateStr).startOf("day"), "day")
);

const parseDay = (date) => dayjs(date).day();
const parseHour = (dateStr) => dayjs(dateStr, "YYYY-MM-DD HH:mm").hour();
const parseMinute = (dateStr) => dayjs(dateStr, "YYYY-MM-DD HH:mm").minute();

// Layer 2
const isWeekend = R.pipe(parseDay, R.either(R.equals(0), R.equals(6)));
const isBetween0hAnd1h = (hour) => R.includes(hour, [0, 1]);
const is0Minute = (minute) => minute === 0;
const isFrom1AMTill2AM = R.converge(R.or, [
  R.pipe(parseHour, isBetween0hAnd1h),
  R.both(R.pipe(parseHour, R.equals(2)), R.pipe(parseMinute, is0Minute)),
]);

// Layer 3
const calculateBasePointsByRecords = R.length;
const calculateBonusPointsWith = (filter) =>
  R.pipe(filter, R.length, R.clamp(0, 2));
const calculateTotalScoreWith = (fA, fB) => R.pipe(R.converge(R.add, [fA, fB]));

const findUserByName = R.curry((userName, users) =>
  R.find(R.propEq(userName, "userName"))(users)
);

// Layer 4
const filterByWeekend = R.filter(R.pipe(R.prop("dateStr"), isWeekend));
const fitlerByNotKeenkend = R.reject(R.pipe(R.prop("dateStr"), isWeekend));

const filterBy1AMTill2AM = R.filter(
  R.pipe(R.prop("dateStr"), isFrom1AMTill2AM)
);
const filterByGroupStudy = R.filter(R.propEq("같이공부", "type"));
const filterByNonMainFieldStudy = R.filter(R.propEq("다른분야공부", "type"));
const filterByConferenceJoined = R.filter(R.propEq("컨퍼런스참여", "type"));

// Layer 5 (기획 요구사항 레벨)
const calculateWeekendBonusPoints = calculateBonusPointsWith(filterByWeekend);

const calculateGroupStudyBonusPoints =
  calculateBonusPointsWith(filterByGroupStudy);

const calculateNonMainFieldStudyBonusPoints = calculateBonusPointsWith(
  filterByNonMainFieldStudy
);

const calculateConferenceJoinedBonusPoints = calculateBonusPointsWith(
  filterByConferenceJoined
);

const calculateBonusPointsByRecords = R.pipe(
  R.converge(R.unapply(R.sum), [
    calculateWeekendBonusPoints,
    R.pipe(fitlerByNotKeenkend, calculateNonMainFieldStudyBonusPoints),
    R.pipe(fitlerByNotKeenkend, calculateConferenceJoinedBonusPoints),
    R.pipe(R.complement(fitlerByNotKeenkend), calculateGroupStudyBonusPoints),
  ]),
  R.clamp(0, 2)
);

const calculateTotalScoreByRecords = calculateTotalScoreWith(
  calculateBasePointsByRecords,
  calculateBonusPointsByRecords
);

const generateUserSpecReport = (info) => `
이름: ${info.userName}
헤택 : ${info.bonusBenefitDescription}
목표 점수: ${info.targetScore}
총 획득 점수: ${info.totalScore} (인증: ${info.basePoint} + 보너스: ${
  info.bonusPoint
})
남은 점수: ${info.scoreNeeded}
마지막 스터디 시간: ${info.lastStudyTime ?? "없음"} ${
  !info.daySinceLastStudy
    ? ""
    : info.daySinceLastStudy === 0
    ? "(당일)"
    : `(${info.daySinceLastStudy}일 전 인증)`
}
`;

module.exports = {
  mapNested,
  isWeekend,
  isFrom1AMTill2AM,
  adjustToPrevDayEnd,
  sortByAscDate,
  sortByDescTotalScore,
  lastStudyTime,
  daySinceLastStudy,
  uniqueByDay,
  calculateBasePointsByRecords,
  calculateBonusPointsWith,
  calculateTotalScoreWith,
  findUserByName,
  filterByWeekend,
  filterBy1AMTill2AM,
  filterByGroupStudy,
  filterByNonMainFieldStudy,
  filterByConferenceJoined,
  calculateWeekendBonusPoints,
  calculateGroupStudyBonusPoints,
  calculateNonMainFieldStudyBonusPoints,
  calculateConferenceJoinedBonusPoints,
  calculateBonusPointsByRecords,
  calculateTotalScoreByRecords,
  formatToDateOnly,
  generateUserSpecReport,
};
