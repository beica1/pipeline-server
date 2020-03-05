/**
 * task.js of pipleline-server
 * Created by beica on 2020/1/3
 */
const R = require('ramda')
const { query } = require('./index')

const collectionName = 'tasks'

const col = db => db.collection(collectionName)

module.exports.read = () => query(async (db, resolve, reject) => {
  const docs = await col(db).find().toArray()
  resolve(docs)
})
