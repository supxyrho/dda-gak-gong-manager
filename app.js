const allStudyRecords = require("./allStudyRecords");
const allUsers = require("./userInfos");

const R = require("ramda");
const dayjs = require("dayjs");

const {
  isBetween1AMTill2AM,
  sortByAscDate,
  uniqByDate,
  toEventScoreFormat,
} = require("./utils");

const preprocessAllStudyRecords = R.pipe(
  R.groupBy(R.prop("userName")),
  R.values,
  // @brief : Midnight ~ AM 2 사이 값을 이전날 23:59로 변경
  R.map(
    R.map(
      R.when(
        R.pipe(R.prop("dateStr"), isBetween1AMTill2AM),
        R.evolve({
          dateStr: (dateStr) =>
            dayjs(dateStr, "YYYY-MM-DD:HH:mm")
              .subtract(1, "day")
              .set("hour", 23)
              .set("minute", 59)
              .format("YYYY-MM-DD:HH:mm"),
        })
      )
    )
  ),
  // R.forEach(R.tap((el)=> console.log('el', el))),
  R.map(sortByAscDate),
  R.map(uniqByDate),
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
      totalPoint: user.calculateTotalPointsByRecords,
      basePoint: user.calculateBasePointsByRecords,
      bonusPoint: user.calculateBonusPointsByRecords,
    })(record);
  }),
  R.map(toEventScoreFormat),
  R.join(" \n\n\n "),
  R.tap(console.log)
);

preprocessAllStudyRecords(allStudyRecords);
