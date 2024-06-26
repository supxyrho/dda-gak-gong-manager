const R = require("ramda");
const dayjs = require("dayjs");

// functional helper
const mapNested = (fn) => R.map(R.map(fn));

// Layer 1
const sortByAscDate = R.sortWith([R.ascend(R.prop("dateStr"))]);
const sortByDescTotalScore = R.sortWith([R.descend(R.prop("totalScore"))]);
const formatToDateOnly = (dateStr) =>
  dayjs(dateStr, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");
const uniqByDate = R.uniqBy(R.pipe(R.prop("dateStr"), formatToDateOnly));
const adjustToPrevDayEnd = R.evolve({
  dateStr: (dateStr) =>
    dayjs(dateStr, "YYYY-MM-DD:HH:mm")
      .subtract(1, "day")
      .set("hour", 23)
      .set("minute", 59)
      .format("YYYY-MM-DD:HH:mm"),
});

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
const filterBy1AMTill2AM = R.filter(
  R.pipe(R.prop("dateStr"), isFrom1AMTill2AM)
);
const filterByGroupStudy = R.filter(R.propEq("같이공부", "type"));
const filterByNonMainFieldStudy = R.filter(R.propEq("다른분야공부", "type"));
const filterByConferenceJoined = R.filter(R.propEq("컨퍼런스참여", "type"));

// Layer 5 (기획 요구사항 레벨)
const calculateWeekendBonusPoints = calculateBonusPointsWith(filterByWeekend);

const calculateTotalScoreIncludingWeekendBonus = calculateTotalScoreWith(
  calculateBasePointsByRecords,
  calculateWeekendBonusPoints
);

const calculate1AMTo2AMBonusPoints =
  calculateBonusPointsWith(filterBy1AMTill2AM);

const calculateTotalScoreIncluding1AMTo2AMBonus = calculateTotalScoreWith(
  calculateBasePointsByRecords,
  calculate1AMTo2AMBonusPoints
);

const calculateGroupStudyBonusPoints =
  calculateBonusPointsWith(filterByGroupStudy);

const calculateTotalScoreIncludingGroupStudyBonus = calculateTotalScoreWith(
  calculateBasePointsByRecords,
  calculateGroupStudyBonusPoints
);

const calculateNonMainFieldStudyBonusPoints = calculateBonusPointsWith(
  filterByNonMainFieldStudy
);

const calculateTotalScoreIncludingNonMainFieldStudyBonus =
  calculateTotalScoreWith(
    calculateBasePointsByRecords,
    calculateNonMainFieldStudyBonusPoints
  );

const calculateConferenceJoinedBonusPoints = calculateBonusPointsWith(
  filterByConferenceJoined
);

const calculateTotalScoreIncludingConferenceJoinedBonus =
  calculateTotalScoreWith(
    calculateBasePointsByRecords,
    calculateConferenceJoinedBonusPoints
  );

const createEventScoreSpecForUser = (user) =>
  R.applySpec({
    userName: R.always(user.userName),
    eventJobName: R.always(user.eventJobName),
    targetScore: R.always(user.targetScore),
    totalScore: user.calculateTotalScoreByRecords,
    scoreNeeded: (records) =>
      R.subtract(user.targetScore, user.calculateTotalScoreByRecords(records)),
    basePoint: user.calculateBasePointsByRecords,
    bonusPoint: user.calculateBonusPointsByRecords,
  });

const generateEventScoreReport = (info) => `
  이름: ${info.userName}
  디아블로 직업 : ${info.eventJobName}
  목표 점수: ${info.targetScore}
  총 획득 점수: ${info.totalScore} (인증: ${info.basePoint} + 보너스: ${info.bonusPoint})
  남은 점수: ${info.scoreNeeded}

`;

module.exports = {
  mapNested,
  isWeekend,
  isFrom1AMTill2AM,
  adjustToPrevDayEnd,
  sortByAscDate,
  sortByDescTotalScore,
  uniqByDate,
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
  calculateTotalScoreIncludingWeekendBonus,
  calculate1AMTo2AMBonusPoints,
  calculateTotalScoreIncluding1AMTo2AMBonus,
  calculateGroupStudyBonusPoints,
  calculateTotalScoreIncludingGroupStudyBonus,
  calculateNonMainFieldStudyBonusPoints,
  calculateTotalScoreIncludingNonMainFieldStudyBonus,
  calculateConferenceJoinedBonusPoints,
  calculateTotalScoreIncludingConferenceJoinedBonus,
  formatToDateOnly,
  createEventScoreSpecForUser,
  generateEventScoreReport,
};
