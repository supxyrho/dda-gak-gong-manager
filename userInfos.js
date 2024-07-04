const {
  calculateBasePointsByRecords,
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
} = require("./utils");

module.exports = [
  {
    userName: "최신영",
    eventJobName: "(최대 2회까지) 주말 인증 시, 2회 인증 인정",
    targetScore: 10,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateWeekendBonusPoints,
    calculateTotalScoreByRecords: calculateTotalScoreIncludingWeekendBonus,
  },
  {
    userName: "채문원",
    eventJobName: "(최대 2회까지) 주말 인증 시, 2회 인증 인정",
    targetScore: 10,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateWeekendBonusPoints,
    calculateTotalScoreByRecords: calculateTotalScoreIncludingWeekendBonus,
  },
  {
    userName: "박상민",
    eventJobName: "(최대 2회까지) 주말 인증 시, 2회 인증 인정",
    targetScore: 10,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateWeekendBonusPoints,
    calculateTotalScoreByRecords: calculateTotalScoreIncludingWeekendBonus,
  },

  {
    userName: "김규태",
    eventJobName:
      "(최대 2회까지) 개발 외 타 분야 학습 인증 시, 2회 인증 보너스 제공",
    targetScore: 10,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords: calculateConferenceJoinedBonusPoints,
    calculateTotalScoreByRecords:
      calculateTotalScoreIncludingConferenceJoinedBonus,
  },

  // {
  //   userName: "A",
  //   eventJobName: "바바리안",
  //   targetScore: 15,
  //   calculateBasePointsByRecords,
  //   calculateBonusPointsByRecords: calculateWeekendBonusPoints,
  //   calculateTotalScoreByRecords: calculateTotalScoreIncludingWeekendBonus
  // },
  // {
  //   userName: "B",
  //   eventJobName: "어쎄신",
  //   targetScore: 15,
  //   calculateBasePointsByRecords,
  //   calculateBonusPointsByRecords: calculate1AMTo2AMBonusPoints,
  //   calculateTotalScoreByRecords:calculateTotalScoreIncluding1AMTo2AMBonus
  // },

  // {
  //   userName: "C",
  //   eventJobName: "드루이드",
  //   targetScore: 15,
  //   calculateBasePointsByRecords,
  //   calculateBonusPointsByRecords:calculateGroupStudyBonusPoints,
  //   calculateTotalScoreByRecords:calculateTotalScoreIncludingGroupStudyBonus
  // },

  // // 아마존 생략

  // {
  //   userName: "E",
  //   eventJobName: "소서리스",
  //   targetScore: 15,
  //   calculateBasePointsByRecords,
  //   calculateBonusPointsByRecords:calculateNonMainFieldStudyBonusPoints,
  //   calculateTotalScoreByRecords: calculateTotalScoreIncludingNonMainFieldStudyBonus
  // },
  // {
  //   userName: "E",
  //   eventJobName: "소서리스",
  //   targetScore: 15,
  //   calculateBasePointsByRecords,
  //   calculateBonusPointsByRecords: calculateConferenceJoinedBonusPoints,
  //   calculateTotalScoreByRecords: calculateTotalScoreIncludingConferenceJoinedBonus
  // },
];
