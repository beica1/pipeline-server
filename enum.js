/**
 * enum.js of pipleline-server
 * Created by beica on 2020/1/2
 */
const R = require('ramda')
const rolesConfig = require('./config/roles')

module.exports.GENDER = {
  FEMALE: { value: 0 },
  MALE: { value: 1 }
}

module.exports.FILE_TYPE = {
  REQUIREMENT: { value: 0 },
  ASSETS: { value: 1 },
  DESIGN: { value: 2 },
}

const getBuiltInRoles = R.pipe(R.map(R.juxt([R.prop('key'), R.o(R.objOf('value'), R.prop('type'))])), R.fromPairs)

module.exports.ROLE = {
  SUPER_ADMIN: { value: 0 },
  ...getBuiltInRoles(rolesConfig)
}

module.exports.ACTION = {
  CREATE: { value: 0 },
  EDIT: { value: 1 },
  CLOSE: { value: 2 },
  PENDING: { value: 3 },
  COMMENT: { value: 4 }
}

module.exports.TASK_STATE = {
  PREPARE: { value: 0 },
  DOING: { value: 1 },
  DONE: { value: 2 },
  PENDING: { value: 3 },
  EXPIRED: { value: 4 }
}

module.exports.SORT = {
  DESC: { value: 0 },
  ASC: { value: 1 }
}
