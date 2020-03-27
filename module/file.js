/**
 * @description file.js of pipeline-server
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/25>
 */
const { store } = require('../db/file')

module.exports.create = store

module.exports.clean = () => {}
