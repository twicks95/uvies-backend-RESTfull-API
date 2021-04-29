const express = require('express')
const route = express.Router()
const userModel = require('./user_model')

route.patch('/:id', userModel.updateUser)
route.delete('/:id', userModel.deleteUser)

module.exports = route
