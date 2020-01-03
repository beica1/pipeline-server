/**
 * user.js of pipleline-server
 * Created by beica on 2020/1/3
 */
const db = require('../db/user')

module.exports.isLogged = db.isLogged

module.exports.login = db.login

module.exports.logout = db.logout
