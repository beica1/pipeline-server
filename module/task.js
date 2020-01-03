/**
 * task.js of pipleline-server
 * Created by beica on 2020/1/3
 */
const R = require('ramda')
const { authenticate } = require('./auth')
const db = require('../db/task')

module.exports.read = R.pipe(authenticate, db.read)
