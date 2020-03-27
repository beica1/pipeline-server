const express = require('express')
const serveAll = require('./service')

/**
 * create and start
 */

const app = express()

serveAll(app).then(() => {
  app.listen(4000)
  console.log('Server started')
})
