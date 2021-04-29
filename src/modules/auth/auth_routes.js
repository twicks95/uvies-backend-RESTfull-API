const express = require('express')
const route = express.Router()
const { register, login, updateUser, deleteUser } = require('./auth_controller')

route.post('/register', register)
route.post('/login', login)
route.patch('/:id', updateUser)
route.delete('/:id', deleteUser)

module.exports = route
