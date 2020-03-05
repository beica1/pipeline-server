/**
 * group.js of pipeline-server
 * Created by beica on 2020/3/5
 */
const { read, create, remove } = require('../module/group')

module.exports = {
  Query: {
    groups: read,
  },
  Mutation: {
    addGroup: create,
    removeGroup: remove,
  },
}
