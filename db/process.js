/**
 * process.js of pipeline-server
 * Created by beica on 2020/2/11
 */
const R = require('ramda')
const { guid } = require('../util/common')
const { query } = require('./index')

const collectionName = 'processes'

const col = db => db.collection(collectionName)

module.exports.readProcesses = () => query(async (db, resolve, reject) => {
  const processes = col(db).find().toArray()
  resolve(processes)
})

module.exports.createProcess = process => query(async (db, resolve, reject) => {
  const id = guid()
  const data = R.assoc('processId', id, process)
  try {
    const result = await col(db).insertOne(data).then()
    if (R.propEq('insertedCount', 1, result)) {
      resolve({
        processId: id
      })
    }
  } catch (e) {
    reject(e)
  }
})

module.exports.removeProcess = processId => query(async (db, resolve, reject) => {
  try {
    await col(db).findOneAndDelete({ processId })
    resolve(processId)
  } catch (e) {
    reject(e)
  }
})

