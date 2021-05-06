const express = require('express')
const route = express.Router()

const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

const userController = require('./user_controller')

route.get('/activate/:id', userController.updateUserStatus)
route.patch(
  '/data/:id',
  authMiddleware.authentication,
  uploadFile('user_profile_picture'),
  userController.updateUserData
)
route.patch(
  '/password/:id',
  authMiddleware.authentication,
  uploadFile('user_profile_picture'),
  userController.updateUserPassword
)
route.delete('/:id', authMiddleware.authentication, userController.deleteUser)

module.exports = route
