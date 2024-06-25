const R = require("ramda");
const dayjs = require("dayjs");

// Section : small utilities
const sortByAscDate = R.sortWith([R.ascend(R.prop("dateStr"))]);
const formatToDateOnly = (dateStr) =>
  dayjs(dateStr, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");
const uniqByDate = R.uniqBy(R.pipe(R.prop("dateStr"), formatToDateOnly));


// Section: parsing date
const parseDay = (date) => dayjs(date).day();
const parseHour = (dateStr) => dayjs(dateStr, "YYYY-MM-DD HH:mm").hour();
const parseMinute = (dateStr) => dayjs(dateStr, "YYYY-MM-DD HH:mm").minute();


// about filtering predicate
const isWeekend = R.pipe(parseDay, R.either(R.equals(0), R.equals(6)));
const isBetween0hAnd1h = (hour) => R.includes(hour, [0, 1]);
const is0Minute = (minute) => minute === 0;
const isFrom1AMTill2AM = R.converge(R.or, [
  R.pipe(parseHour, isBetween0hAnd1h),
  R.both(R.pipe(parseHour, R.equals(2)), R.pipe(parseMinute, is0Minute)),
]);


// Section: calculating points
const calculateBasePointsByRecords = R.length;
const calculateBonusPointsWith = (filter) =>
  R.pipe(filter, R.length, R.clamp(0, 2));
const calculateTotalScoreWith = (fA, fB) =>
  R.pipe(R.converge(R.add, [fA, fB]));

// Section: filtering
const filterByWeekend = R.filter(R.pipe(R.prop("dateStr"), isWeekend));
const filterBy1AMTill2AM = R.filter(
  R.pipe(R.prop("dateStr"), isFrom1AMTill2AM)
);
const filterByGroupStudy = R.filter(R.propEq("같이공부", "type"));
const filterByNonMainFieldStudy = R.filter(
  R.filter(R.propEq("다른분야공부", "type"))
);
const filterByConferenceJoined = R.filter(R.propEq("컨퍼런스참여", "type"));


// Section: user level requirements
const calculateWeekendBonusPoints = calculateBonusPointsWith(
  filterByWeekend
);

const calculateTotalScoreIncludingWeekendBonus = calculateTotalScoreWith(
  calculateBasePointsByRecords,
  calculateWeekendBonusPoints
);

const calculate1AMTo2AMBonusPoints = calculateBonusPointsWith(
  filterBy1AMTill2AM
);

const calculateTotalScoreIncluding1AMTo2AMBonus = calculateTotalScoreWith(
  calculateBasePointsByRecords,
  calculate1AMTo2AMBonusPoints
);

const calculateGroupStudyBonusPoints = calculateBonusPointsWith(
  filterByGroupStudy
);

const calculateTotalScoreIncludingGroupStudyBonus = calculateTotalScoreWith(
  calculateBasePointsByRecords,
  calculateGroupStudyBonusPoints
);

const calculateNonMainFieldStudyBonusPoints = calculateBonusPointsWith(
  filterByNonMainFieldStudy
);

const calculateTotalScoreIncludingNonMainFieldStudyBonus = calculateTotalScoreWith(
  calculateBasePointsByRecords,
  calculateNonMainFieldStudyBonusPoints
);

const calculateConferenceJoinedBonusPoints = calculateBonusPointsWith(
  filterByConferenceJoined
);

const calculateTotalScoreIncludingConferenceJoinedBonus = calculateTotalScoreWith(
  calculateBasePointsByRecords,
  calculateConferenceJoinedBonusPoints
);

const toEventScoreFormat = (info) => `
  이름: ${info.userName}
  디아블로 직업 : ${info.eventJobName}
  총 획득 점수: ${info.totalScore} (인증: ${info.basePoint} + 보너스: ${info.bonusPoint})
`;

module.exports = {
  calculateBasePointsByRecords,
  calculateBonusPointsWith,
  calculateTotalScoreWith,
  filterByWeekend,
  filterBy1AMTill2AM,
  filterByGroupStudy,
  filterByNonMainFieldStudy,
  filterByConferenceJoined,
  isWeekend,
  isFrom1AMTill2AM,
  sortByAscDate,
  uniqByDate,
  formatToDateOnly,
  toEventScoreFormat,
  calculateWeekendBonusPoints,
  calculateTotalScoreIncludingWeekendBonus,
  calculate1AMTo2AMBonusPoints,
  calculateTotalScoreIncluding1AMTo2AMBonus,
  calculateGroupStudyBonusPoints,
  calculateTotalScoreIncludingGroupStudyBonus,
  calculateNonMainFieldStudyBonusPoints,
  calculateTotalScoreIncludingNonMainFieldStudyBonus,
  calculateConferenceJoinedBonusPoints,
  calculateTotalScoreIncludingConferenceJoinedBonus 
};
