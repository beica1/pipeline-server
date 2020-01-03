/**
 * scalar.js of pipleline-server
 * Created by beica on 2020/1/2
 */
const { GraphQLScalarType } = require('graphql')
const { GENDER, FILE_TYPE, ROLE, ACTION, SORT, TASK_STATE } = require('../enum')

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'normal js Date',
    serialize: v => v.toISOString(),
    parseValue: v => new Date(v),
    parseLiteral: ast => ast.value
  }),
  Gender: GENDER,
  FileType: FILE_TYPE,
  RoleType: ROLE,
  Action: ACTION,
  TaskState: TASK_STATE,
  Sort: SORT
}
