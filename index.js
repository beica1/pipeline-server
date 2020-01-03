const express = require('express')
const graphqlHTTP = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const jwt = require('express-jwt')
const schema = require('./schema')
const resolver = require('./resolver')
const { login, parseToken, onError, PRIVATE_KEY } = require('./module/auth')

const app = express()

const jwtMiddleware = jwt({
  secret: PRIVATE_KEY,
  getToken: parseToken
}).unless({
  path: ['/api/login', /\/api\/\/open.*/, /.*\/jsonp$/]
})

const graphqlMiddleware = graphqlHTTP({
  schema: makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolver
  }),
  graphiql: true,
})

app.use('/api*', [jwtMiddleware, graphqlMiddleware])

app.use(onError)

app.listen(4000)

console.log('Running a GraphQL API server at http://localhost:4000/api')
