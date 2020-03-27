/**
 * @description index.js of pipeline-server
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/25>
 */
const R = require('ramda')
const serveApi = require('./api')
const serveFile = require('./file')
const serveDB = require('./db')

/**
 * @param app
 * @returns {Promise}
 */
module.exports = R.pipe(R.juxt([serveApi, serveFile]), serveDB)
