const express = require('express')
const route = express.Router()
const {
  getBookingByBookingId,
  getAllBookingByUserId,
  postBooking,
  getBookingSeatByBookingId,
  getBookedSeat,
  getEarnings
} = require('./booking_controller')
const { authentication, isAdmin } = require('../../middleware/auth.js')

route.post('/', authentication, postBooking)
route.get('/by/bookingId/:id', authentication, getBookingByBookingId)
route.get('/by/userId', authentication, getAllBookingByUserId)
route.get('/seat/:id', authentication, getBookingSeatByBookingId)
route.get('/seat/booked/:id', authentication, getBookedSeat)
route.get('/data/dashboard', authentication, isAdmin, getEarnings)

module.exports = route
