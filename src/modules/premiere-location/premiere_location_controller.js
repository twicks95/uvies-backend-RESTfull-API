const wrapper = require('../../helpers/wrapper')
const premiereLocationModel = require('./premiere_location_model')

module.exports = {
  getAllPremiereLocation: async (req, res) => {
    try {
      const result = await premiereLocationModel.getAllData()
      return wrapper.response(
        res,
        200,
        'Get All Premiere Location Success!',
        result
      )
    } catch (error) {
      return wrapper.response(
        res,
        404,
        'Failed To Get All Premiere Location Data!',
        error
      )
    }
  }
}
