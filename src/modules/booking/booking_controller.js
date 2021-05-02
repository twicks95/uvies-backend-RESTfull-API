// const wrapper = require('../../helpers/wrapper')
const pagination = require('../../helpers/pagination')
const wrapper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')

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
        bookingSeat
      } = req.body

      const setDataBooking = {
        user_id: userId,
        premiere_id: premiereId,
        schedule_id: scheduleId,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        booking_payment_method: bookingPaymentMethod,
        booking_status: bookingStatus
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

  getAllBooking: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await bookingModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = pagination.pageInfo(page, totalPage, limit, totalData)
      const result = await bookingModel.getAllData(limit, offset)
      return wrapper.response(
        res,
        200,
        'Success Get All Booking Data',
        result,
        pageInfo
      )
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
