// const wrapper = require('../../helpers/wrapper')
const pagination = require('../../helpers/pagination')
const wrapper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')

module.exports = {
  postBooking: async (req, res) => {
    try {
      // proses destructuring ini untuk mengeluarkan nilai dari objek hasil req.body
      const {
        premiereID,
        bookingTicket,
        bookingTotalPrice,
        bookingPaymentMethod,
        bookingStatus,
        bookingSeat
      } = req.body

      // karena query di model membutuhkan beberapa data yang dibutuhkan untuk proses insert, maka dibuatlah objek setData untuk menampung nilai dari tiap" property dari req.body ke masing" property yang memiliki nama sesuai dengan nama kolom yang ada di tabel booking database
      const setDataBooking = {
        premiere_id: premiereID,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        booking_payment_method: bookingPaymentMethod,
        booking_status: bookingStatus
      }

      const bookingResult = await bookingModel.createDataToBooking(setDataBooking)

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
