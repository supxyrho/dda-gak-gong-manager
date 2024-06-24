const R = require("ramda");
const dayjs = require("dayjs");

const isWeekend = (date) => {
  const day = dayjs(date).day();
  return day === 0 || day === 6;
};

const parseHour = (dateStr) => dayjs(dateStr, "YYYY-MM-DD HH:mm").hour();
const parseMinute = (dateStr) => dayjs(dateStr, "YYYY-MM-DD HH:mm").minute();

const isBetween0hAnd1h = (hour) => R.includes(hour, [0, 1]);
const is0Minute = (minute) => minute === 0;

const isBetween1AMTill2AM = R.converge(R.or, [
  R.pipe(parseHour, isBetween0hAnd1h),
  R.both(R.pipe(parseHour, R.equals(2)), R.pipe(parseMinute, is0Minute)),
]);

const calculateBasePointsByRecords = R.length;
const calculateBonusPointsWith = (filter) =>
  R.pipe(filter, R.length, R.clamp(0, 2));
const calculateTotalPointsWith = (fA, fB) =>
  R.pipe(R.converge(R.add, [fA, fB]));

const filterByWeekend = R.filter(R.pipe(R.prop("dateStr"), isWeekend));
const filterByMidnightTo2AM = R.filter(
  R.pipe(R.prop("dateStr"), isBetween1AMTill2AM)
);
const filterByGroupStudy = R.filter(R.propEq("같이공부", "type"));
const filterByNonMainFieldStudy = R.filter(
  R.filter(R.propEq("다른분야공부", "type"))
);
const filterByConferenceJoined = R.filter(R.propEq("컨퍼런스참여", "type"));

const formatDate = (dateStr) =>
  dayjs(dateStr, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");

const sortByAscDate = R.sortWith([R.ascend(R.prop("dateStr"))]);
const uniqByDate = R.uniqBy(R.pipe(R.prop("dateStr"), formatDate));

const toEventScoreFormat = (info) => `
  이름: ${info.userName}
  디아블로 직업 : ${info.eventJobName}
  총 획득 점수: ${info.totalPoint} (인증: ${info.basePoint} + 보너스: ${info.bonusPoint})
`;

module.exports = {
  calculateBasePointsByRecords,
  calculateBonusPointsWith,
  calculateTotalPointsWith,
  filterByWeekend,
  filterByMidnightTo2AM,
  filterByGroupStudy,
  filterByNonMainFieldStudy,
  filterByConferenceJoined,
  isWeekend,
  isBetween1AMTill2AM,
  sortByAscDate,
  uniqByDate,
  formatDate,
  toEventScoreFormat,
};
