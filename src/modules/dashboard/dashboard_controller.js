const dashboardModel = require('./dashboard_model')
const wrapper = require('../../helpers/wrapper')

module.exports = {
  getAllEarnings: async (req, res) => {
    try {
      const { movie, premiere, location } = req.query

      let queryClause
      if (movie && premiere && location) {
        queryClause = `WHERE movie_id = ${movie} AND premiere_id = ${premiere} AND location_id = ${location}`
      } else if (movie && premiere) {
        queryClause = `WHERE movie_id = ${movie} AND premiere_id = ${premiere}`
      } else if (premiere && location) {
        queryClause = `WHERE premiere_id = ${premiere} AND location_id = ${location}`
      } else if (movie && location) {
        queryClause = `WHERE movie_id = ${movie} AND location_id = ${location}`
      } else if (movie) {
        queryClause = `WHERE movie_id = ${movie}`
      } else if (premiere) {
        queryClause = `WHERE premiere_id = ${premiere}`
      } else if (location) {
        queryClause = `WHERE location_id = ${location}`
      } else {
        queryClause = ''
      }

      const result = await dashboardModel.getEarnings(queryClause)
      return wrapper.response(res, 200, 'Success Get Earnings', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
