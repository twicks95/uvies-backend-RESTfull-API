const express = require('express')
const route = express.Router()
const { getAllPremiereLocation } = require('./premiere_location_controller')

route.get('/', getAllPremiereLocation)
// route.delete('/:id', deletePremiereLocation)

module.exports = route
