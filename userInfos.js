const {
  calculateBasePointsByRecords,
  calculateBonusPointsByRecords,
  calculateTotalScoreByRecords,
} = require("./utils");

module.exports = [
  {
    userName: "채문원",
    bonusBenefitDescription:
      "(최대 3회까지) 1회당 2회 인증 => 주말 학습, 개발 외 타분야 학습, 컨퍼런스 참가, 함께 학습, 미라클 모닝(오전4~오전8시), 사이드프로젝트, 팀프로젝트",
    targetScore: 11,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords,
    calculateTotalScoreByRecords,
  },
  {
    userName: "김규태",
    bonusBenefitDescription:
      "(최대 3회까지) 1회당 2회 인증 => 주말 학습, 개발 외 타분야 학습, 컨퍼런스 참가, 함께 학습, 미라클 모닝(오전4~오전8시), 사이드프로젝트, 팀프로젝트",
    targetScore: 11,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords,
    calculateTotalScoreByRecords,
  },

  {
    userName: "고은민",
    bonusBenefitDescription:
      "(최대 3회까지) 1회당 2회 인증 => 주말 학습, 개발 외 타분야 학습, 컨퍼런스 참가, 함께 학습, 미라클 모닝(오전4~오전8시), 사이드프로젝트, 팀프로젝트",
    targetScore: 15,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords,
    calculateTotalScoreByRecords,
  },


  {
    userName: "박상민",
    bonusBenefitDescription:
      "(최대 2회까지) 1회당 2회 인증 => 주말 학습, 개발 외 타분야 학습, 컨퍼런스 참가, 함께 공부",
    targetScore: 11,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords,
    calculateTotalScoreByRecords,
  },

  {
    userName: "박민호",
    bonusBenefitDescription:
      "(최대 2회까지) 1회당 2회 인증 => 주말 학습, 개발 외 타분야 학습, 컨퍼런스 참가, 함께 공부",
    targetScore: 11,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords,
    calculateTotalScoreByRecords,
  },

  {
    userName: "이한나",
    bonusBenefitDescription:
      "(최대 2회까지) 1회당 2회 인증 => 주말 학습, 개발 외 타분야 학습, 컨퍼런스 참가, 함께 공부",
    targetScore: 11,
    calculateBasePointsByRecords,
    calculateBonusPointsByRecords,
    calculateTotalScoreByRecords,
  },
];
