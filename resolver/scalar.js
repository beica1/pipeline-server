/**
 * scalar.js of pipleline-server
 * Created by beica on 2020/1/2
 */
const { GraphQLScalarType, GraphQLEnumType } = require('graphql')
const { GENDER, FILE_TYPE, ROLE, ACTION, SORT, TASK_STATE } = require('../enum')

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Type of js-Date',
    serialize: v => v ? v.toISOString() : null,
    parseValue: v => v ? new Date(v) : null,
    parseLiteral: ast => ast.value
  }),
  Gender: new GraphQLEnumType({
    name: 'Gender',
    values: GENDER,
    description: 'Type of Gender, male and female'
  }),
  FileType: new GraphQLEnumType({
    name: 'FileType',
    values: FILE_TYPE,
    description: 'Type of requirements files'
  }),
  RoleType: new GraphQLEnumType({
    name: 'RoleType',
    values: ROLE,
    description: 'Type of Role'
  }),
  Action: new GraphQLEnumType({
    name: 'RoleType',
    values: ACTION,
    description: 'Type of task action'
  }),
  TaskState: new GraphQLEnumType({
    name: 'TaskState',
    values: TASK_STATE,
    description: 'Type of task state'
  }),
  Sort: new GraphQLEnumType({
    name: 'Sort',
    values: SORT,
    description: 'Type of sort'
  })
}
