const express = require('express')
const route = express.Router()
const { authentication, isAdmin } = require('../../middleware/auth')
const {
  getAllPremiere,
  getAllPremiereWithoutJoinSchedule,
  postPremiere,
  updatePremiere,
  deletePremiere
} = require('./premiere_controller')

route.get('/', getAllPremiere)
route.get('/2', getAllPremiereWithoutJoinSchedule)
route.post('/', authentication, isAdmin, postPremiere)
route.patch('/:id', authentication, isAdmin, updatePremiere)
route.delete('/:id', authentication, isAdmin, deletePremiere)

module.exports = route
