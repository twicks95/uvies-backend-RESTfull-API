const express = require('express')
const route = express.Router()
const premiereLocationController = require('./premiere_location_controller')
const { authentication } = require('../../middleware/auth')

route.get(
  '/',
  authentication,
  premiereLocationController.getAllPremiereLocation
)
// route.delete('/:id', premiereLocationModel.deletePremiereLocation)

module.exports = route
