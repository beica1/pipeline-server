/**
 * user.js of pipeline-server
 * Created by beica on 2020/3/5
 */
const { auth } = require('./admin')
const { create, update, read, remove } = require('../db/user')

/**
 * 新增用户并同时添加用户到组
 * @return {Promise}
 */
module.exports.create = auth((obj, { user }) => create(user))

module.exports.update = auth((obj, { userId, user }) => update(userId, user))

module.exports.read = auth(() => read())

module.exports.remove = auth((obj, { userId }) => remove(userId))

module.exports.readGroupUsers = auth(group => read({
  userId: {
    $in: group.member
  }
}))
