const wrapper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    // akan berisi
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VyX25hbWUiOiJ0Z3c5NSIsInVzZXJfZW1haWwiOiJzYXloYWxsby50ZWd1aEBnbWFpbC5jb20iLCJ1c2VyX2NyZWF0ZWRfYXQiOiIyMDIxLTA0LTI3VDA1OjA2OjQyLjAwMFoiLCJ1c2VyX3VwZGF0ZWRfYXQiOm51bGwsImlhdCI
    let token = req.headers.authorization

    if (token) {
      // split req.headers.authorization to get token
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
