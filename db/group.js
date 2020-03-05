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
 * @returns {Promise<Array> | Object.s.promiseLibrary}
 */
module.exports.read = () => query(async (db, resolve, reject) => {
  const groups = await col(db).find().toArray()
  resolve(groups)
})

/**
 * create new group
 * @param group
 * @returns {Promise<Object> | Object.s.promiseLibrary}
 */
module.exports.create = group => query(async (db, resolve, reject) => {
  console.log('create group data', group)
  const groupId = guid()
  const data = {
    groupId,
    ...group
  }
  try {
    await col(db).insertOne(data)
    resolve(data)
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
