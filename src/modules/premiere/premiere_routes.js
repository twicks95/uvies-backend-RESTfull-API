const express = require('express')
const route = express.Router()

const authMiddleware = require('../../middleware/auth')

const premiereController = require('./premiere_controller')

route.get('/', premiereController.getAllPremiere)
route.get('/:id', premiereController.getAllPremiere)
route.post('/', authMiddleware.isAdmin, premiereController.postPremiere)
route.patch('/:id', authMiddleware.isAdmin, premiereController.updatePremiere)
route.delete('/:id', authMiddleware.isAdmin, premiereController.deletePremiere)

module.exports = route
