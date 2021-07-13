const express = require('express')
const route = express.Router()
const {
  getAllBookingByBookingId,
  getAllBookingByUserId,
  postBooking,
  getBookingSeatByBookingId,
  getBookedSeat,
  getEarnings
} = require('./booking_controller')
const { authentication, isAdmin } = require('../../middleware/auth.js')

route.post('/', authentication, postBooking)
route.get('/by/bookingId', authentication, getAllBookingByBookingId)
route.get('/by/userId', authentication, getAllBookingByUserId)
route.get('/seat/:id', authentication, getBookingSeatByBookingId)
route.get('/seat/booked/:id', authentication, getBookedSeat)
route.get('/data/dashboard', authentication, isAdmin, getEarnings)

module.exports = route
