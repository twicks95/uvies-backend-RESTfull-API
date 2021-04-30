const express = require('express')
const route = express.Router()

const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

const userModel = require('./user_model')

route.patch(
  '/:id',
  authMiddleware.authentication,
  uploadFile('user_profile_picture'),
  userModel.updateUser
)
route.delete('/:id', authMiddleware.authentication, userModel.deleteUser)

module.exports = route
