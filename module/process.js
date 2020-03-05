/**
 * process.js of pipeline-server
 * Created by beica on 2020/2/25
 */
const { readProcesses, createProcess, removeProcess } = require('../db/process')

module.exports.createProcess = (obj, { process }) => createProcess(process)

module.exports.readProcesses = readProcesses

module.exports.removeProcess = (obj, { processId }) => removeProcess(processId)
