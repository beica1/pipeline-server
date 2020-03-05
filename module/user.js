/**
 * user.js of pipeline-server
 * Created by beica on 2020/3/5
 */
const { create, update, read, remove } = require('../db/user')

module.exports.create = (obj, { user }) => create(user)

module.exports.update = (obj, { userId, user }) => update(userId, user)

module.exports.read = () => read()

module.exports.remove = (obj, { userId }) => remove(userId)

module.exports.readGroupUsers = group => read({ 'groups.groupId': group.groupId })
