const express = require('express')
const route = express.Router()

const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

const userController = require('./user_controller')

route.get('/activate/:id', userController.updateUserStatus)
route.get('/:id', userController.getUserById)
route.patch(
  '/update/data/:id',
  authMiddleware.authentication,
  userController.updateUserData
)
route.patch(
  '/data/image/:id',
  // authMiddleware.authentication,
  uploadFile('user_profile_picture'),
  userController.updateUserImage
)
route.patch(
  '/password/:id',
  authMiddleware.authentication,
  userController.updateUserPassword
)
route.delete('/:id', authMiddleware.authentication, userController.deleteUser)

module.exports = route
