/**
 * group.js of pipeline-server
 * Created by beica on 2020/1/8
 */
const { guid } = require('../util/common')
const { query } = require('./index')

const collectionName = 'groups'

const col = db => db.collection(collectionName)

/**
 * read groups
 * @param {Object} [filter]
 * @returns {Promise<[Group]> | Object.s.promiseLibrary}
 */
module.exports.read = filter => query(async (db, resolve, reject) => {
  const groups = await col(db).find(filter).toArray()
  resolve(groups)
})

/**
 * create new group
 * @param {Object} group
 * @returns {Promise<Object> | Object.s.promiseLibrary}
 */
module.exports.create = group => query(async (db, resolve, reject) => {
  const groupId = guid()
  const data = {
    groupId,
    ...group
  }
  try {
    await col(db).insertOne(data)
    resolve(groupId)
  } catch (e) {
    reject(e)
  }
})

/**
 * remove specified group item
 * @param {String} groupId
 * @returns {Promise<String> | Object.s.promiseLibrary}
 */
module.exports.remove = groupId => query((db, resolve, reject) => {
  col(db).findOneAndDelete({ groupId }).then(() => {
    resolve(groupId)
  }, reject)
})

/**
 * 增加或移除指定组中的用户
 * @param {String} groupId
 * @param {String} userId
 * @param {String} [mode='add'|'remove']
 * @returns {Promise | Promise<String>}
 */
module.exports.updateGroupUser = (groupId, userId, mode = 'add') => query(async (db, resolve, reject) => {
  const operation = mode === 'add' ? '$addToSet' : '$pull'
  console.log(operation, groupId, userId)
  try {
    await col(db).findOneAndUpdate({ groupId }, {
      [operation]: {
        member: userId
      }
    })
    resolve(userId)
  } catch (e) {
    reject(e)
  }
})
