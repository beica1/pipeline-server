/**
 * admin.js of pipeline-server
 * Created by beica on 2020/1/8
 */
const { read, readUserRoles } = require('../module/admin')

module.exports = {
  Query: {
    roles: read
  },
  User: {
    roles: readUserRoles
  }
}
