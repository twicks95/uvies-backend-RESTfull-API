const express = require('express')
const route = express.Router()

const bookingController = require('./booking_controller')

route.post('/', bookingController.postBooking)
route.get('/', bookingController.getAllBooking)

module.exports = route
