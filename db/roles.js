/**
 * roles.js of pipeline-server
 * Created by beica on 2020/1/10
 */
const R = require('ramda')
const { guid } = require('../util/common')
const { query } = require('./index')
const rolesConfig = require('../config/roles')
const { raiseError } = require('../util/common')

const collectionName = 'roles'

const col = db => db.collection(collectionName)

const initRoles = async db => {
  const transducer = R.compose(R.map(item => {
    const id = guid()
    return R.assoc('roleId', id, item)
  }), R.map(R.omit('key')))
  const data = R.transduce(transducer, R.flip(R.append), [], rolesConfig)
  try {
    const result = await col(db).insertMany(data)
    if (R.equals(result.insertedCount, rolesConfig.length)) {
      return true
    } else {
      raiseError(new Error('roles init failed'))
    }
  } catch (e) {
    raiseError(e)
  }
}

const init = () => query(async (db, resolve, reject) => {
  const count = await col(db).countDocuments()
  if (R.equals(count, 0)) {
    await initRoles(db)
    resolve()
  } else {
    resolve()
  }
})

/**
 *
 * @param filter {Object?}
 * @returns {Promise | Promise<[Object]>}
 */
module.exports.read = filter => query(async (db, resolve, reject) => {
  try {
    const docs = await col(db).find(filter).toArray()
    if (R.equals(docs.length, 0)) {
      await init()
      const docs = await col(db).find().toArray()
      resolve(docs)
    } else {
      resolve(docs)
    }
  } catch (e) {
    reject(e)
  }
})

