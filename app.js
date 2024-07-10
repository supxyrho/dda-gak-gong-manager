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
              bonusBenefitDescription: R.prop("bonusBenefitDescription"),
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
    R.converge(
      R.concat,
      [
        R.identity,
        R.pipe(
          R.differenceWith(R.eqProps('userName'), allUsers),
          R.map(
            R.applySpec({
              userName: R.prop('userName'), 
              bonusBenefitDescription: R.prop('bonusBenefitDescription'),
              targetScore: R.prop('targetScore'),
              totalScore: R.always(0),
              basePoint: R.always(0),
              bonusPoint: R.always(0),
              scoreNeeded: R.prop('targetScore'),
              lastStudyTime: R.always(null),
              daySinceLastStudy: R.always(null),
            })
          )
        )
      ]
    ),
    // @brief : JSON에 기입 시, 잘못 기입한 값이 있을 수 있으므로, undefined 값이 있는 객체가 있는지 확인 후, 에러를 발생시키도록 처리
    // @TODO: 추후 에러가 발생한 객체만 별도 모나드 처리 후 별도 처리하고, 에러가 발생하지 않은 객체는 정상 출력하도록 처리
    // @TODO: 파이프 최상단에서 우선적으로 Validation을 수행하도록 처리
    R.tap(
      R.forEach(
        R.pipe(
          R.values, 
          R.forEach(R.when(R.equals(undefined), ()=> { throw new Error('undefined value detected in object')}))
        )
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
