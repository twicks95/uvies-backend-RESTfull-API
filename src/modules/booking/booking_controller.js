// const wrapper = require('../../helpers/wrapper')
const wrapper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')

module.exports = {
  postBooking: async (req, res) => {
    try {
      // proses destructuring ini untuk mengeluarkan nilai dari objek hasil req.body
      const {
        userID,
        premiereID,
        bookingTicket,
        bookingTotalPrice,
        bookingPaymentMethod,
        bookingStatus
      } = req.body
      // karena query di model membutuhkan beberapa data yang dibutuhkan untuk proses insert, maka dibuatlah objek setData untuk menampung nilai dari tiap" property dari req.body ke masing" property yang memiliki nama sesuai dengan nama kolom yang ada di tabel booking database
      const setData = {
        user_id: userID,
        premiere_id: premiereID,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        booking_payment_method: bookingPaymentMethod,
        booking_status: bookingStatus
      }
      const result = await bookingModel.createData(setData)
      return wrapper.response(res, 200, 'Success Create Booking', result)
    } catch (error) {
      console.log(error)
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
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
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
