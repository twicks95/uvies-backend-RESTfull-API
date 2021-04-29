const express = require('express')
const route = express.Router()
const { register, login, updateUser } = require('./auth_controller')

route.post('/register', register)
route.post('/login', login)
route.patch('/:id', updateUser)

module.exports = route
