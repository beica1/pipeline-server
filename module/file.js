/**
 * @description file.js of pipeline-server
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/25>
 */
const { store, remove, read } = require('../db/file')

module.exports.create = store

module.exports.clean = () => {}

module.exports.read = read

module.exports.remove = remove
