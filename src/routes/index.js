const express = require('express')
const route = express.Router()

const authRouter = require('../modules/auth/auth_routes')
const movieRouter = require('../modules/movie/movie_routes')
const premiereRouter = require('../modules/premiere/premiere_routes')
const premiereLocationRouter = require('../modules/premiere/premiere_location_routes')
const scheduleRouter = require('../modules/schedule/schedule_routes')
const bookingRouter = require('../modules/booking/booking_routes')
const userRouter = require('../modules/user/user_routes')

route.use('/auth', authRouter)
route.use('/movie', movieRouter)
route.use('/premiere', premiereRouter)
route.use('/premiere-location', premiereLocationRouter)
route.use('/schedule', scheduleRouter)
route.use('/booking', bookingRouter)
route.use('/user', userRouter)

module.exports = route
