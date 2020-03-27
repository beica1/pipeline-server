/**
 * @description api.js of pipeline-server
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/25>
 */
const R = require('ramda')
const graphqlHTTP = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { error, errors } = require('./format')
const schema = require('../schema')
const resolver = require('../resolver')
const { authMiddleware } = require('../module/auth')

/**
 * api 服务
 * @param app
 * @function
 */
module.exports = app => {
  const graphqlMiddleware = graphqlHTTP({
    schema: makeExecutableSchema({
      typeDefs: schema,
      resolvers: resolver
    }),
    graphiql: true,
    customFormatErrorFn: R.unary(error)
  })
  
  app.use('/api*', [authMiddleware, graphqlMiddleware])
  
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json(errors.UN_AUTHORIZED)
      next()
    }
  })
}
