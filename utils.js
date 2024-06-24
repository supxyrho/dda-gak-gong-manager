
const R = require("ramda");
const dayjs = require("dayjs");

const isWeekend = (date) => {
  const day = dayjs(date).day();
  return day === 0 || day === 6;
};

const isMidnightTo2AM = (date) => {
  const hour = dayjs(date, 'YYYY-MM-DD HH:mm').hour();
  const minute = dayjs(date, 'YYYY-MM-DD HH:mm').minute();

  const isMidnightHour = R.includes(hour, [0, 1]);
  const is2AMExact = R.both(R.equals(2),  R.equals(minute, 0));

  return R.either(isMidnightHour, is2AMExact);
};

const calculateBasePointsByRecords = R.length;
const calculateBonusPointsWith = (filter) =>
  R.pipe(filter, R.length, R.clamp(0, 2));
const calculateTotalPointsWith = (fA, fB) => (records) =>
  R.pipe(R.converge(R.add, [fA, fB]))(records);

const filterByWeekend = R.filter(R.pipe(R.prop("dateStr"), isWeekend));
const filterByMidnightTo2AM = R.filter(
  R.pipe(R.prop("dateStr"), isMidnightTo2AM)
);
const filterByGroupStudy = R.filter(R.propEq("같이공부", "type"));
const filterByNonMainFieldStudy = R.filter(
  R.filter(R.propEq("다른분야공부", "type"))
);
const filterByConferenceJoined = R.filter(R.propEq("컨퍼런스참여", "type"));

const formatDate = (dateStr) =>
  dayjs(dateStr, "YYYY-MM-DD:HH:mm").format("YYYY-MM-DD");

const sortByAscDate = R.sortWith([R.ascend(R.prop("dateStr"))]);
const uniqByDate = R.uniqBy(R.pipe(R.prop("dateStr"), formatDate));

const toEventScoreFormat = (info) => `
  이름: ${info.userName}
  디아블로 직업 : ${info.eventJobName}
  총 획득 점수: ${info.totalPoint} (인증: ${info.basePoint} + 보너스: ${info.bonusPoint})
`

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
    isMidnightTo2AM,
    sortByAscDate,
    uniqByDate,
    formatDate,
    toEventScoreFormat 
}