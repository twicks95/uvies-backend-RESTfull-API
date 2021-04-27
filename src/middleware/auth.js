const wrapper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    // akan berisi
    // Bearer tokenSignature
    let token = req.headers.authorization

    if (token) {
      // split req.headers.authorization to get token signature
      token = token.split(' ')[1]

      // token validation
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return wrapper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          next()
        }
      })
    } else {
      return wrapper.response(res, 403, 'Please login first!')
    }
  },

  isAdmin: (req, res, next) => {
    // authorization user role
    if (req.decodeToken.user_role === 1) {
      next()
    } else {
      return wrapper.response(res, 403, 'Access Denied')
    }
  }
}
