const express = require('express')
const Route = express.Router()

const premiereController = require('./premiere_location_controller')

Route.get('/', premiereController.getAllPremiereLocation)
// Route.post('/', premiereController.postPremiereLocation)
// Route.patch('/:id', premiereController.updatePremiereLocation)
// Route.delete('/:id', premiereController.deletePremiereLocation)

module.exports = Route
