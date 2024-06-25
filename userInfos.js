const { 
  calculateBasePointsByRecords,
  calculateWeekendBonusPoints, calculateTotalPointsIncludingWeekendBonus,
  calculate1AMTo2AMBonusPoints, calculateTotalPointsIncluding1AMTo2AMBonus,
  calculateGroupStudyBonusPoints, calculateTotalPointsIncludingGroupStudyBonus,
  calculateNonMainFieldStudyBonusPoints, calculateTotalPointsIncludingNonMainFieldStudyBonus,
  calculateConferenceJoinedBonusPoints, calculateTotalPointsIncludingConferenceJoinedBonus,
} = require("./utils");

module.exports = [
  {
    userName: "A",
    eventJobName: "바바리안",
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateWeekendBonusPoints,
    calculateTotalPointsByRecords: calculateTotalPointsIncludingWeekendBonus
  },
  {
    userName: "B",
    eventJobName: "어쎄신",
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculate1AMTo2AMBonusPoints,
    calculateTotalPointsByRecords:calculateTotalPointsIncluding1AMTo2AMBonus
  },

  {
    userName: "C",
    eventJobName: "드루이드",
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords:calculateGroupStudyBonusPoints, 
    calculateTotalPointsByRecords:calculateTotalPointsIncludingGroupStudyBonus
  },

  // 아마존 생략

  {
    userName: "E",
    eventJobName: "소서리스",
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords:calculateNonMainFieldStudyBonusPoints,
    calculateTotalPointsByRecords: calculateTotalPointsIncludingNonMainFieldStudyBonus
  },
  {
    userName: "E",
    eventJobName: "소서리스",
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateConferenceJoinedBonusPoints,
    calculateTotalPointsByRecords: calculateTotalPointsIncludingConferenceJoinedBonus
  },
];
