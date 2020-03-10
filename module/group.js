/**
 * group.js of pipeline-server
 * Created by beica on 2020/3/5
 */
const { auth } = require('./admin')
const { read, create, remove } = require('../db/group')

module.exports.read = auth(() => read())

module.exports.create = auth((obj, { group }) => create(group))

module.exports.remove = auth((obj, { groupId }) => remove(groupId))

module.exports.readUserGroups = auth((user) => read({
  groupId: {
    $in: user.groups
  }
}))
