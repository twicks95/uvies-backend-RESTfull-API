const express = require('express')
const Route = express.Router()

const movieRouter = require('../modules/movie/movie_routes')
const premiere = require('../modules/premiere/premiere_routes')
// const schedule = require('../modules/schedule/schedule_routes')
const booking = require('../modules/booking/booking_routes')

Route.use('/movie', movieRouter)
Route.use('/premiere', premiere)
// Route.use('/schedule', schedule)
Route.use('/booking', booking)

module.exports = Route
