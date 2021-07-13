const express = require('express')
const route = express.Router()
const { authentication, isAdmin } = require('../../middleware/auth')
const premiereController = require('./premiere_controller')

route.get('/', premiereController.getAllPremiere)
route.get('/2', premiereController.getAllPremiereWithoutJoinSchedule)
route.post('/', authentication, isAdmin, premiereController.postPremiere)
route.patch('/:id', authentication, isAdmin, premiereController.updatePremiere)
route.delete('/:id', authentication, isAdmin, premiereController.deletePremiere)

module.exports = route
