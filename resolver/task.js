/**
 * task.js of pipleline-server
 * Created by beica on 2020/1/3
 */
const { read } = require('../db/task')

module.exports = {
  Query: {
    tasks: async (obj, args, context) => await read()
  }
}
