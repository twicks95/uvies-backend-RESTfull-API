const bookingModel = require('./booking_model')
const premiereModel = require('../premiere/premiere_model')
const pagination = require('../../helpers/pagination')
const wrapper = require('../../helpers/wrapper')

module.exports = {
  postBooking: async (req, res) => {
    try {
      const {
        userId,
        premiereId,
        scheduleId,
        bookingTicket,
        bookingTotalPrice,
        bookingPaymentMethod,
        bookingStatus,
        bookingSeat,
        bookingDate
      } = req.body

      const getPremiere = await premiereModel.getDataById(premiereId)
      const movieId = getPremiere[0].movie_id
      const locationId = getPremiere[0].location_id

      const setDataBooking = {
        user_id: parseInt(userId),
        movie_id: movieId,
        premiere_id: parseInt(premiereId),
        location_id: locationId,
        schedule_id: parseInt(scheduleId),
        booking_ticket: parseInt(bookingTicket),
        booking_total_price: parseInt(bookingTotalPrice),
        booking_payment_method: bookingPaymentMethod,
        booking_status: bookingStatus,
        booking_for_date: bookingDate
      }
      const bookingResult = await bookingModel.createDataToBooking(
        setDataBooking
      )

      await bookingSeat.forEach((element) => {
        const setDataBookingSeat = {
          booking_id: bookingResult.id,
          booking_seat_location: element
        }
        bookingModel.createDataToBookingSeat(setDataBookingSeat)
      })
      return wrapper.response(res, 200, 'Success Create Booking', bookingResult)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllBookingByUserId: async (req, res) => {
    try {
      let { userId, limit } = req.query
      limit = !limit ? 100 : parseInt(limit)

      const totalBooking = await bookingModel.getDataCountByUserId(userId)
      const pageInfo = pagination.pageInfo(0, 0, limit, totalBooking, 0)
      const result = await bookingModel.getAllDataByUserId(userId, limit)

      if (result.length > 0) {
        return wrapper.response(
          res,
          200,
          `Success Get All Booking Data By User Id ${userId}`,
          result,
          pageInfo
        )
      } else {
        return wrapper.response(
          res,
          404,
          `No Booking Data With User Id ${userId}`,
          result
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getBookingByBookingId: async (req, res) => {
    try {
      const { id } = req.params

      const result = await bookingModel.getDataByBookingId(id)
      if (result.length > 0) {
        return wrapper.response(
          res,
          200,
          `Success Get Booking Data By Booking Id ${id}`,
          result
        )
      } else {
        return wrapper.response(
          res,
          404,
          `No Booking Data With Booking Id ${id}`,
          result
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getBookingSeatByBookingId: async (req, res) => {
    try {
      const { id } = req.params

      const result = await bookingModel.getBookingSeatData(id)
      if (result.length > 0) {
        return wrapper.response(res, 200, 'Success', result)
      } else {
        return wrapper.response(
          res,
          404,
          `No Booking Seat Data By Id ${id}`,
          []
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getBookedSeat: async (req, res) => {
    try {
      const { id } = req.params
      const { date, scheduleId } = req.query
      const result = await bookingModel.getBookedSeat(id, date, scheduleId)
      if (result.length > 0) {
        return wrapper.response(res, 200, 'Success', result)
      } else {
        return wrapper.response(res, 404, 'No Data', [])
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getEarnings: async (req, res) => {
    try {
      const { movieId, premiere = '', locationId } = req.query
      const movieStatement = movieId
        ? `movie_id = ${movieId}`
        : 'movie_id LIKE "%%"'
      const locationStatement = locationId
        ? `location_id = ${locationId}`
        : 'location_id LIKE "%%"'

      const result = await bookingModel.getTotalEarnings(
        movieStatement,
        premiere,
        locationStatement
      )
      return wrapper.response(res, 200, 'Success', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
