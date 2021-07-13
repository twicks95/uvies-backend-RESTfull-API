const premiereLocationModel = require('./premiere_location_model')
const wrapper = require('../../helpers/wrapper')

module.exports = {
  getAllPremiereLocation: async (req, res) => {
    try {
      const { noGroup } = req.query

      let result
      if (noGroup) {
        result =
          await premiereLocationModel.getAllPremiereLocationWithoutGroup()
      } else {
        result = await premiereLocationModel.getAllPremiereLocation()
      }

      return wrapper.response(
        res,
        200,
        'Success Get All Premiere Location',
        result
      )
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
