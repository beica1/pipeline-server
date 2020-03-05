/**
 * admin.js of pipeline-server
 * Created by beica on 2020/1/8
 */
const { readRoles } = require('../module/admin')

module.exports = {
  Query: {
    roles: readRoles
  }
}
