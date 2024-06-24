const { calculateBasePointsByRecords, calculateBonusPointsWith, calculateTotalPointsWith, filterByWeekend, filterByMidnightTo2AM, filterByGroupStudy, filterByNonMainFieldStudy, filterByConferenceJoined } = require("./utils");

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
      filterByMidnightTo2AM
    ),
    calculateTotalPointsByRecords: calculateTotalPointsWith(
      calculateBasePointsByRecords,
      calculateBonusPointsWith(filterByMidnightTo2AM)
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
