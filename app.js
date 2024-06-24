const allStudyRecords = require("./allStudyRecords");
const allUsers = require("./userInfos");

const R = require("ramda");
const dayjs = require("dayjs");

const formatDate = (dateStr) =>
  dayjs(dateStr, "YYYY-MM-DD:HH:mm").format("YYYY-MM-DD");

const sortByAscDate = R.sortWith([R.ascend(R.prop("dateStr"))]);
const uniqByDate = R.uniqBy(R.pipe(R.prop("dateStr"), formatDate));

const preprocessAllStudyRecords = R.pipe(
  R.groupBy(R.prop("userName")),
  R.values,
  R.map(sortByAscDate),
  R.map(uniqByDate)
);

const groupedStudyRecords = preprocessAllStudyRecords(allStudyRecords);

console.log("hello world", groupedStudyRecords);

console.log(
  "groupedStudyRecords",
  allUsers[0].calculateTotalPointsByRecords(groupedStudyRecords[0])
);
