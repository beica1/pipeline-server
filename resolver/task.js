/**
 * task.js of pipleline-server
 * Created by beica on 2020/1/3
 */
const { guid } = require('../util/common')

module.exports = {
  Query: {
    task: (obj, args, context) => {
      console.log(context.user, context.json, context.res.json)
      return {
        id: guid()
      }
    }
  }
}
