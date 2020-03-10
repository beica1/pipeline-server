/**
 * user.js of pipleline-server
 * Created by beica on 2020/1/3
 */
const R = require('ramda')
const { query } = require('./index')
const { guid } = require('../util/common')

const collectionName = 'users'

const col = db => db.collection(collectionName)

module.exports.login = (filter) => query(async (db, resolve, reject) => {
  const user = await col(db).find(filter).toArray()
  if (user.length === 1) {
    resolve(user)
  } else {
    reject(new Error('name or pwd error'))
  }
})

module.exports.create = user => query(async (db, resolve, reject) => {
  const userId = guid()
  const newUser = R.assoc('userId', userId, user)
  try {
    const result = await col(db).insertOne(newUser)
    if (R.propEq('insertedCount', 1, result)) {
      resolve(userId)
    }
  } catch (e) {
    reject(e)
  }
})

module.exports.update = (userId, user) => query(async (db, resolve, reject) => {
  try {
    await col(db).updateOne({ userId }, {$set: user})
    resolve(userId)
  } catch (e) {
    reject(e)
  }
})

/**
 * read User(s)
 * @param filter {Object?}
 * @returns {Promise | Promise<[User]>}
 */
module.exports.read = filter => query(async (db, resolve, reject) => {
  try {
    const docs = await col(db).find(filter).toArray()
    resolve(docs)
  } catch (e) {
    reject(e)
  }
})

module.exports.remove = userId => query(async (db, resolve, reject) => {
  try {
    await col(db).findOneAndDelete({ userId })
    resolve(userId)
  } catch (e) {
    reject(e)
  }
  
})
