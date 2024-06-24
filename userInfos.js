const R = require("ramda");
const dayjs = require("dayjs");

const isWeekend = (date) => {
  const day = dayjs(date).day();
  return day === 0 || day === 6;
};

const isMidnightTo2AM = (date) => {
  const hour = dayjs(date).hour();
  const minute = dayjs(date).minute();

  return hour === 0 || hour === 1 || (hour === 2 && minute === 0);
};

const calculateBasePointsByRecords = R.length;
const calculateBonusPointsWith = (filter) =>
  R.pipe(filter, R.length, R.clamp(0, 2));
const calculateTotalPointsWith = (fA, fB) => (records) =>
  R.pipe(R.converge(R.add, [fA, fB]))(records);

const filterByWeekend = R.filter(R.pipe(R.prop("dateStr"), isWeekend));
const fitlerByMidnightTo2PM = R.filter(
  R.pipe(R.prop("dateStr"), isMidnightTo2AM)
);
const filterByGroupStudy = R.filter(R.propEq("같이공부", "type"));
const filterByNonMainFieldStudy = R.filter(
  R.filter(R.propEq("다른분야공부", "type"))
);
const filterByConferenceJoined = R.filter(R.propEq("컨퍼런스참여", "type"));

module.exports = [
  {
    userName: "A",
    eventJobName: "바바리안",
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateBonusPointsWith(filterByWeekend),
    calculateTotalPointsByRecords: calculateTotalPointsWith(
      calculateBasePointsByRecords,
      calculateBonusPointsWith(filterByWeekend)
    ),
  },
  {
    userName: "B",
    eventJobName: "어쎄신",
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateBonusPointsWith(
      fitlerByMidnightTo2PM
    ),
    calculateTotalPointsByRecords: calculateTotalPointsWith(
      calculateBasePointsByRecords,
      calculateBonusPointsWith(fitlerByMidnightTo2PM)
    ),
  },

  {
    userName: "C",
    eventJobName: "드루이드",
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateBonusPointsWith(filterByGroupStudy),
    calculateTotalPointsByRecords: calculateTotalPointsWith(
      calculateBasePointsByRecords,
      calculateBonusPointsWith(filterByGroupStudy)
    ),
  },

  // 아마존 생략

  {
    userName: "E",
    eventJobName: "소서리스",
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateBonusPointsWith(
      filterByNonMainFieldStudy
    ),
    calculateTotalPointsByRecords: calculateTotalPointsWith(
      calculateBasePointsByRecords,
      calculateBonusPointsWith(filterByNonMainFieldStudy)
    ),
  },
  {
    userName: "E",
    eventJobName: "소서리스",
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateBonusPointsWith(
      filterByConferenceJoined
    ),
    calculateTotalPointsByRecords: calculateTotalPointsWith(
      calculateBasePointsByRecords,
      calculateBonusPointsWith(filterByConferenceJoined)
    ),
  },
];
