const allStudyRecords = require("./allStudyRecords");
const allUsers = require("./userInfos");

const R = require("ramda");
const dayjs = require("dayjs");

const {
  isFrom1AMTill2AM,
  adjustToPrevDayEnd,
  sortByAscDate,
  uniqByDate,
  toEventScoreFormat,
} = require("./utils");

const preprocessAllStudyRecords = R.pipe(
  R.groupBy(R.prop("userName")),
  R.values,
  R.map(
    R.map(
      R.when(R.pipe(R.prop("dateStr"), isFrom1AMTill2AM), adjustToPrevDayEnd)
    )
  ),
  R.map(sortByAscDate),
  R.map(uniqByDate),
  // @TODO: refactoring needed
  R.map((record) => {
    const userName = R.pipe(R.head, R.prop("userName"))(record);
    const eventJobName = R.pipe(
      R.find(R.propEq(userName, "userName")),
      R.prop("eventJobName")
    )(allUsers);
    const user = R.find(R.propEq(userName, "userName"))(allUsers);
    return R.applySpec({
      userName: R.always(userName),
      eventJobName: R.always(eventJobName),
      targetScore: R.always(user.targetScore),
      totalScore: user.calculateTotalScoreByRecords,
      scoreNeeded: (record) =>
        R.subtract(user.targetScore, user.calculateTotalScoreByRecords(record)),
      basePoint: user.calculateBasePointsByRecords,
      bonusPoint: user.calculateBonusPointsByRecords,
    })(record);
  }),
  R.map(toEventScoreFormat),
  R.join(" \n\n\n "),
  R.tap(console.log)
);

preprocessAllStudyRecords(allStudyRecords);
