const express = require('express')
const route = express.Router()
const scheduleController = require('./schedule_controller')
const { authentication, isAdmin } = require('../../middleware/auth')

route.post('/', authentication, isAdmin, scheduleController.postSchedule)
route.get(
  '/:id',
  authentication,
  isAdmin,
  scheduleController.getScheduleByPremiereId
)
route.get(
  '/premiere/clock',
  authentication,
  scheduleController.getScheduleByPremiereClock
)
// route.patch('/:id', scheduleController.updateSchedule)
route.delete(
  '/:id',
  authentication,
  isAdmin,
  scheduleController.deleteScheduleById
)
route.delete(
  '/by/premiere/:id',
  authentication,
  isAdmin,
  scheduleController.deleteScheduleByPremiereId
)

module.exports = route
