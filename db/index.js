/**
 * index.js of pipleline-server
 * Created by beica on 2020/1/2
 const url = 'mongodb://admin:Admin123@122.51.253.3:27017/pipeline'
 */
const R = require('ramda')
const Mongo = require('mongodb').MongoClient
const config = require('./config')

const url = `mongodb://${config.user}:${config.passport}@${config.address}/${config.dbName}`

// console.log('url', url)

const client = new Mongo(url, {
  useUnifiedTopology: true
})

const onConnected = () => {
  console.log('Database connected')
}

const onConnectError = () => {
  console.error('database connect error')
}

module.exports.connect = () => client.connect().then(onConnected, onConnectError)

const getDB = () => client.db(config.dbName)

const dbQuery = fn => {
  if (client.isConnected()) {
    return fn(getDB())
  }
  else {
    return new Promise((resolve, reject) => {
      client.connect().then(() => {
        resolve(fn(getDB()))
      }, reject)
    })
  }
}

module.exports.query = fn => dbQuery(db => new Promise(R.partial(fn, [db])))
