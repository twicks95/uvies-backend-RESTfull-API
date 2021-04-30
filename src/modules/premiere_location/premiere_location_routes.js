const express = require('express')
const route = express.Router()
const premiereLocationModel = require('./premiere_location_model')

route.get('/', premiereLocationModel.getAllPremiereLocation)
route.delete('/:id', premiereLocationModel.deletePremiereLocation)

module.exports = route
