const { 
  calculateBasePointsByRecords,
  calculateWeekendBonusPoints, calculateTotalScoreIncludingWeekendBonus,
  calculate1AMTo2AMBonusPoints, calculateTotalScoreIncluding1AMTo2AMBonus,
  calculateGroupStudyBonusPoints, calculateTotalScoreIncludingGroupStudyBonus,
  calculateNonMainFieldStudyBonusPoints, calculateTotalScoreIncludingNonMainFieldStudyBonus,
  calculateConferenceJoinedBonusPoints, calculateTotalScoreIncludingConferenceJoinedBonus,
} = require("./utils");

module.exports = [
  {
    userName: "A",
    eventJobName: "바바리안",
    targetScore: 15,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateWeekendBonusPoints,
    calculateTotalScoreByRecords: calculateTotalScoreIncludingWeekendBonus
  },
  {
    userName: "B",
    eventJobName: "어쎄신",
    targetScore: 15,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculate1AMTo2AMBonusPoints,
    calculateTotalScoreByRecords:calculateTotalScoreIncluding1AMTo2AMBonus
  },

  {
    userName: "C",
    eventJobName: "드루이드",
    targetScore: 15,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords:calculateGroupStudyBonusPoints, 
    calculateTotalScoreByRecords:calculateTotalScoreIncludingGroupStudyBonus
  },

  // 아마존 생략

  {
    userName: "E",
    eventJobName: "소서리스",
    targetScore: 15,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords:calculateNonMainFieldStudyBonusPoints,
    calculateTotalScoreByRecords: calculateTotalScoreIncludingNonMainFieldStudyBonus
  },
  {
    userName: "E",
    eventJobName: "소서리스",
    targetScore: 15,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateConferenceJoinedBonusPoints,
    calculateTotalScoreByRecords: calculateTotalScoreIncludingConferenceJoinedBonus
  },
];
