const allStudyRecords = require("./allStudyRecords");
const allUsers = require("./userInfos");

const R = require("ramda");

const {
  mapNested,
  isFrom1AMTill2AM,
  adjustToPrevDayEnd,
  findUserByName,
  sortByAscDate,
  sortByDescTotalScore,
  uniqByDate,
  lastStudyTime,
  daySinceLastStudy,
  createEventScoreSpecForUser,
  generateUserSpecReport,
} = require("./utils");

const preprocess = R.curry((allUsers, allStudyRecords) =>
  R.pipe(
    R.groupBy(R.prop("userName")),
    R.values,
    mapNested(
      R.when(R.pipe(R.prop("dateStr"), isFrom1AMTill2AM), adjustToPrevDayEnd)
    ),
    R.map(sortByAscDate),
    R.map(uniqByDate),
    R.map(
      R.converge(
        (records, user) =>
          R.mergeAll([
            R.applySpec({
              userName: R.prop("userName"),
              eventJobName: R.prop("eventJobName"),
              targetScore: R.prop("targetScore"),
            })(user),
            R.applySpec({
              totalScore: R.pipe(
                R.prop("calculateTotalScoreByRecords"),
                R.applyTo(R.__)(records)
              ),
              basePoint: R.pipe(
                R.prop("calculateBasePointsByRecords"),
                R.applyTo(R.__)(records)
              ),
              bonusPoint: R.pipe(
                R.prop("calculateBonusPointsByRecords"),
                R.applyTo(R.__)(records)
              ),
              scoreNeeded: R.converge(
                R.pipe(R.subtract, R.clamp(0, Infinity)),
                [
                  R.prop("targetScore"),
                  R.pipe(
                    R.prop("calculateTotalScoreByRecords"),
                    R.applyTo(R.__)(records)
                  ),
                ]
              ),
            })(user),
            R.applySpec({
              lastStudyTime: lastStudyTime,
              daySinceLastStudy: daySinceLastStudy,
            })(records),
          ]),

        [
          R.identity,
          R.pipe(R.head, R.prop("userName"), R.flip(findUserByName)(allUsers)),
        ]
      )
    ),
    sortByDescTotalScore
  )(allStudyRecords)
);

// main
R.pipe(
  preprocess(allUsers),
  R.map(generateUserSpecReport),
  R.join(" \n "),
  R.tap(console.log)
)(allStudyRecords);

module.exports = {
  preprocess,
};
