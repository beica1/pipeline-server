/**
 * @description format.js of pipeline-server
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/27>
 */
const R = require('ramda')
const errors = require('./errors')

module.exports.error = mixed => ({
  message: R.propOr(mixed, 'message', mixed),
  code: R.propOr(errors.UN_RESOLVED.code, 'code', mixed)
})

module.exports.response = mixed => ({
  data: R.propOr(mixed, 'data', mixed),
  message: R.propOr(errors.NO_ERROR.message, 'message', mixed),
  code: R.propOr(errors.NO_ERROR.code, 'code', mixed)
})

module.exports.errors = errors
