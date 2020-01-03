/**
 * auth.js of pipleline-server
 * Created by beica on 2020/1/2
 */
const R = require('ramda')
const jwt = require('jsonwebtoken')
const { guid } = require('../util/common')

const PRIVATE_KEY = 'C5X79422-C9C9-BE84-BC0E-3C3FD93202D6'

const jwtOpts = {
  expiresIn: '1day'
}

module.exports.PRIVATE_KEY = PRIVATE_KEY

module.exports.authenticate = token => {}

module.exports.isBoss = token => {}

module.exports.onError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      c: 401
    })
  }
}

module.exports.login = (args, res) => {
  const user = {
    jti: guid(),
    iss: 'PPS',
    user: 'cd'
  }
  
  return new Promise((resolve, reject) => {
    jwt.sign(user, PRIVATE_KEY, jwtOpts, (err, token) => {
      if (!err) {
        res.cookie('token', token)
        resolve({
          id: 'jojo'
        })
      } else {
        reject(err)
      }
    })
  })
}

module.exports.parseToken = R.pipe(
  R.pathOr('', ['headers', 'cookie']),
  R.match(/token=([^;]+)/),
  R.nth(1)
)
