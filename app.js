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
  uniqueByDay,
  lastStudyTime,
  daySinceLastStudy,
  generateUserSpecReport,
} = require("./utils");

const preprocess = R.curry((allUsers, allStudyRecords) =>
  R.pipe(
    R.groupBy(R.prop("userName")),
    R.values,
    R.map(sortByAscDate),
    R.map(
      R.converge(
        (originalRecords, transformedRecords,  user) =>
          R.mergeAll([
            R.applySpec({
              userName: R.prop("userName"),
              eventJobName: R.prop("eventJobName"),
              targetScore: R.prop("targetScore"),
            })(user),
            R.applySpec({
              totalScore: R.pipe(
                R.prop("calculateTotalScoreByRecords"),
                R.applyTo(R.__)(transformedRecords)
              ),
              basePoint: R.pipe(
                R.prop("calculateBasePointsByRecords"),
                R.applyTo(R.__)(transformedRecords)
              ),
              bonusPoint: R.pipe(
                R.prop("calculateBonusPointsByRecords"),
                R.applyTo(R.__)(transformedRecords)
              ),
              scoreNeeded: R.converge(
                R.pipe(R.subtract, R.clamp(0, Infinity)),
                [
                  R.prop("targetScore"),
                  R.pipe(
                    R.prop("calculateTotalScoreByRecords"),
                    R.applyTo(R.__)(transformedRecords)
                  ),
                ]
              ),
            })(user),
            R.applySpec({
              lastStudyTime,
              daySinceLastStudy,
            })(originalRecords),
          ]),
          [
            R.identity,
            R.pipe(
              mapNested(R.when(R.pipe(R.prop("dateStr"), isFrom1AMTill2AM), adjustToPrevDayEnd)),
              uniqueByDay
            ),
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
