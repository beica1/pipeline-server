/**
 * group.js of pipeline-server
 * Created by beica on 2020/3/5
 */
const { auth } = require('./admin')
const { read, create, remove } = require('../db/group')

module.exports.read = auth(() => read())

module.exports.create = (obj, { group }) => create(group)

module.exports.remove = (obj, { groupId }) => remove(groupId)
