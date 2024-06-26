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
  createEventScoreSpecForUser,
  generateEventScoreReport,
} = require("./utils");

const preprocess = R.pipe(
  R.groupBy(R.prop("userName")),
  R.values,
  mapNested(
    R.when(R.pipe(R.prop("dateStr"), isFrom1AMTill2AM), adjustToPrevDayEnd)
  ),
  R.map(sortByAscDate),
  R.map(uniqByDate),
  R.map(
    R.converge(
      (records, user) => createEventScoreSpecForUser(user)(records),
      [
        R.identity,
        R.pipe(R.head, R.prop("userName"), R.flip(findUserByName)(allUsers)),
      ]
    )
  ),
  sortByDescTotalScore
);

const print = R.pipe(
  R.map(generateEventScoreReport),
  R.join(" \n\n\n "),
  R.tap(console.log)
);

// main
R.pipe(preprocess, R.tap(console.log), print)(allStudyRecords);
