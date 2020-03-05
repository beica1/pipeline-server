const express = require('express')
const graphqlHTTP = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const schema = require('./schema')
const resolver = require('./resolver')
const { onError, authMiddleware } = require('./module/auth')
const { connect: connectDB } = require('./db')

const app = express()

const graphqlMiddleware = graphqlHTTP({
  schema: makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolver
  }),
  graphiql: true,
})

app.use('/api*', [authMiddleware, graphqlMiddleware])

app.use(onError)

app.listen(4000)

connectDB()

console.log('Running a GraphQL API server at http://localhost:4000/api')
