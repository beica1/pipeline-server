/**
 * process.js of pipeline-server
 * Created by beica on 2020/2/25
 */
const { readProcesses, createProcess, removeProcess }  = require('../module/process')

module.exports = {
  Query: {
    processes: readProcesses,
  },
  Mutation: {
    createProcess,
    removeProcess
  }
}
