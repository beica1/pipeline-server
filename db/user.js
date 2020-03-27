/**
 * user.js of pipleline-server
 * Created by beica on 2020/1/3
 */
const R = require('ramda')
const { query } = require('./index')
const { guid } = require('../util/common')
const { updateGroupUser } = require('./group')

const removeUserFromGroup = R.pipe(R.unapply, R.append('remove'), R.apply(updateGroupUser))

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

/**
 * 新增用户并更新组信息
 * @param user
 * @returns {Promise | Promise<String>}
 */
module.exports.create = user => query(async (db, resolve, reject) => {
  const userId = guid()
  const newUser = R.assoc('userId', userId, R.omit(['groups'], user))
  try {
    const result = await col(db).insertOne(newUser)
    if (R.propEq('insertedCount', 1, result)) {
      await Promise.all(R.zipWith(updateGroupUser, user.groups, R.repeat(userId, R.length(user.groups))))
      resolve(userId)
    }
  } catch (e) {
    reject(e)
  }
})

/**
 * 修改用户，修改用户组无效
 * @param userId
 * @param user
 * @returns {Promise | Promise<String>}
 */
module.exports.update = (userId, user) => query(async (db, resolve, reject) => {
  try {
    await col(db).updateOne({ userId }, {$set: R.omit(['groups'], user)})
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

/**
 * 删除用户并修改所在的组信息
 * @param userId
 * @returns {Promise | Promise<String>}
 */
module.exports.remove = userId => query(async (db, resolve, reject) => {
  try {
    const { value: user } = await col(db).findOneAndDelete({ userId })
    await Promise.all(R.zipWith(removeUserFromGroup, user.groups, R.repeat(userId, R.length(user.groups))))
    resolve(userId)
  } catch (e) {
    reject(e)
  }
})
