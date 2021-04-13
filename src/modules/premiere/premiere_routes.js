const express = require('express')
const route = express.Router()
const premiereController = require('./premiere_controller')

route.get('/', premiereController.getAllPremiere)
route.post('/', premiereController.postPremiere)
route.patch('/:id', premiereController.updatePremiere)
route.delete('/:id', premiereController.deletePremiere)

module.exports = route
