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
 * @param filter {Object?}
 * @returns {Promise<[Group]> | Object.s.promiseLibrary}
 */
module.exports.read = filter => query(async (db, resolve, reject) => {
  const groups = await col(db).find(filter).toArray()
  resolve(groups)
})

/**
 * create new group
 * @param group
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
 * @param groupId
 * @returns {Promise<String> | Object.s.promiseLibrary}
 */
module.exports.remove = groupId => query((db, resolve, reject) => {
  col(db).findOneAndDelete({ groupId }).then(() => {
    resolve(groupId)
  }, reject)
})
