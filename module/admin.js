/**
 * admin.js of pipeline-server
 * Created by beica on 2020/1/8
 */
const R = require('ramda')
const { read } = require('../db/roles')

const check = (fn, obj, args, ctx) => {
  // console.log('auth check skipped')
  return fn(obj, args, ctx)
}

const auth = fn => R.partial(check, [fn])

module.exports.auth = auth

module.exports.read = auth(() => read())

module.exports.readUserRoles = auth(user => read({
  roleId: {
    $in: user.roles
  }
}))

