const express = require('express')
const route = express.Router()
const scheduleController = require('./schedule_controller')

route.get('/', scheduleController.getAllSchedule)
route.post('/', scheduleController.postSchedule)
route.patch('/:id', scheduleController.updateSchedule)
route.delete('/:id', scheduleController.deleteSchedule)

module.exports = route
