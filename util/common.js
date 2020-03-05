/**
 * common.js of pipleline-server
 * Created by beica on 2020/1/3
 */
const R = require('ramda')

const assembleGUIDPartials = R.o(
  R.join(''),
  R.juxt([R.call, R.o(R.join('-'), R.times(R.__, 5)), R.o(R.join(''), R.times(R.__, 2))])
)

const partialGuid = R.pipe(Math.random, R.add(1), R.multiply(0x10000), Math.floor, R.invoker(1, 'toString')(16), R.invoker(1, 'substring')(1))

module.exports.guid = R.thunkify(assembleGUIDPartials)(partialGuid)

module.exports.raiseError = e => {
  throw e
}
