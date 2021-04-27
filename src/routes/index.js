const express = require('express')
const route = express.Router()

const authRouter = require('../modules/auth/auth_routes')
const movieRouter = require('../modules/movie/movie_routes')
const premiere = require('../modules/premiere/premiere_routes')
const schedule = require('../modules/schedule/schedule_routes')
const booking = require('../modules/booking/booking_routes')

route.use('/auth', authRouter)
route.use('/movie', movieRouter)
route.use('/premiere', premiere)
route.use('/schedule', schedule)
route.use('/booking', booking)

module.exports = route
