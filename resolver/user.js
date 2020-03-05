/**
 * user.js of pipleline-server
 * Created by beica on 2020/1/2
 */
const { login, auth } = require('../module/auth')
const { read, create, update, remove, readGroupUsers } = require('../module/user')

module.exports = {
  Query: {
    users: read
  },
  Mutation: {
    login,
    auth,
    addUser: create,
    updateUser: update,
    removeUser: remove
  },
  Group: {
    member: readGroupUsers
  }
}
