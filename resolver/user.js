/**
 * user.js of pipleline-server
 * Created by beica on 2020/1/2
 */
const { GENDER } = require('../enum')
const { guid } = require('../util/common')
const { login } = require('../module/auth')

const get = () => {
  return new Promise((resolve => {
    setTimeout(() => {
      resolve([])
    }, 3000)
  }))
}

module.exports = {
  User: {
    async tasks (obj, args, context) {
      console.log(Object.keys(context))
      return await get()
    }
  },
  Query: {
    me: () => {
      return {
        id: guid(),
        gender: GENDER.MALE,
        regTime: new Date()
      }
    }
  },
  Mutation: {
    login: async (obj, args, { res }) => await login(args, res)
  }
}
