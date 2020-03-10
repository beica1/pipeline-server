/**
 * auth.js of pipleline-server
 * Created by beica on 2020/1/2
 */
const R = require('ramda')
const jwt = require('jsonwebtoken')
const eJwt = require('express-jwt')
const { guid, raiseError } = require('../util/common')
const { login } = require('../db/user')
const { ROLE } = require('../enum')

const PRIVATE_KEY = 'C5X79422-C9C9-BE84-BC0E-3C3FD93202D6'

const jwtOpts = {
  expiresIn: '1day'
}

module.exports.onError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      c: 401
    })
  }
}

/**
 * jwt token sign
 * @param user
 * @returns {undefined|*}
 */
const sign = user => jwt.sign({
  jti: guid(),
  iss: 'PPS',
  ...user
}, PRIVATE_KEY, jwtOpts)

/**
 * use login by userName and pwd
 * @param obj
 * @param args
 * @param res
 * @returns {Promise<{roles: [number], name: string, userId: number}>}
 */
module.exports.login = async (obj, args, { res }) => {
  try {
    const loggedUser = await login(args)
    const token = sign(loggedUser)
    res.cookie('token', token)
    return loggedUser
  } catch (e) {
    raiseError(e)
  }
}

/**
 * use login by constant auth code
 * @param obj
 * @param code
 * @param res
 * @returns {Promise<{roles: [number], name: string, userId: number}>}
 */
module.exports.auth = async (obj, { code }, { res }) => {
  if (code === PRIVATE_KEY) {
    const user = {
      userId: 0,
      name: 'Admin',
      roles: [ROLE.SUPER_ADMIN]
    }
    const token = sign(user)
    res.cookie('token', token)
    return user
  } else {
    raiseError(new Error('auth code is invalid'))
  }
}

const parseToken = R.pipe(
  R.pathOr('', ['headers', 'cookie']),
  R.match(/token=([^;]+)/),
  R.nth(1)
)

module.exports.authMiddleware = eJwt({
  secret: PRIVATE_KEY,
  getToken: parseToken
}).unless({
  path: ['/api/login', /\/api\/\/open.*/, /.*\/jsonp$/]
})
