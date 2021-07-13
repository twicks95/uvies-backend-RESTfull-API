const express = require('express')
const route = express.Router()
const {
  register,
  resetPassword,
  login,
  resendActivationEmail
} = require('./auth_controller')

route.post('/login', login)
route.post('/register', register)
route.patch('/reset/password', resetPassword)
route.post('/resend/email', resendActivationEmail)

module.exports = route
