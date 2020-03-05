/**
 * admin.js of pipeline-server
 * Created by beica on 2020/1/8
 */
const R = require('ramda')
const { read: readRoles } = require('../db/roles')

const check = (fn, obj, args, ctx) => {
  console.log('auth check skipped')
  return fn(obj, args, ctx)
}

module.exports.auth = fn => R.partial(check, [fn])

module.exports.readRoles = readRoles

