const express = require('express')
const route = express.Router()

const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

const userController = require('./user_controller')

route.get('/activate/:id', userController.updateUserStatus)
route.patch(
  '/:id',
  authMiddleware.authentication,
  uploadFile('user_profile_picture'),
  userController.updateUser
)
route.delete('/:id', authMiddleware.authentication, userController.deleteUser)

module.exports = route
