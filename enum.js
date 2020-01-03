/**
 * enum.js of pipleline-server
 * Created by beica on 2020/1/2
 */
module.exports.GENDER = {
  FEMALE: 0,
  MALE: 1
}

module.exports.FILE_TYPE = {
  REQUIREMENT: 0,
  ASSETS: 1,
  DESIGN: 2,
}

module.exports.ROLE = {
  BOSS: 0,
  ADMIN: 1,
  OPERATION: 2,
  PRODUCT: 3,
  DESIGNER: 4,
  WEB: 5,
  TESTER: 6,
  SERVER: 7
}

module.exports.TASK_STATE = {
  PREPARE: 0,
  DOING: 1,
  TESTING: 2,
  DONE: 3,
  PENDING: 4,
  EXPIRED: 5
}

module.exports.ACTION = {
  CREATE: 0,
  EDIT: 1,
  CLOSE: 2,
  PENDING: 3,
  COMMENT: 4
}

module.exports.SORT = {
  DESC: 0,
  ASC: 1
}
