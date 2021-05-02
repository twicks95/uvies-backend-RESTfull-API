const wrapper = require('../../helpers/wrapper')
const pagination = require('../../helpers/pagination')
const premiereModel = require('./premiere_model')
const scheduleModel = require('../schedule/schedule_model')

module.exports = {
  postPremiere: async (req, res) => {
    try {
      const { movieID, locationID, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieID,
        location_id: locationID,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }
      const result = await premiereModel.createData(setData)
      return wrapper.response(res, 200, 'Success Create Data Premiere', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllPremiere: async (req, res) => {
    try {
      const { id } = req.params
      let {
        date = '',
        location = '',
        movie = '',
        order,
        page = '1',
        limit = '100'
      } = req.query

      let queryCondition
      if (location && movie) {
        queryCondition = `location_city LIKE "%${location}%" AND movie_name LIKE "%${movie}%"`
      } else if (date) {
        queryCondition = `schedule_date LIKE "%${date}%"`
      } else if (location) {
        queryCondition = `location_city LIKE "%${location}%"`
      } else if (movie) {
        queryCondition = `movie_name LIKE "%${movie}%"`
      } else {
        if (id) {
          queryCondition = `premiere.movie_id = ${id} AND premiere_name LIKE "%%"`
        } else {
          queryCondition = 'premiere_name LIKE "%%"'
        }
      }

      page = parseInt(page)
      limit = parseInt(limit)
      let offset = 0
      offset = page * limit - limit
      const totalData = await premiereModel.getDataCount(queryCondition)
      const totalPage = Math.ceil(totalData / limit)
      const pageInfo = pagination.pageInfo(
        page,
        totalPage,
        limit,
        totalData,
        offset
      )

      const result = await premiereModel.getAllData(
        queryCondition,
        order,
        limit,
        offset
      )
      for (const premiere of result) {
        const fromSchedule = await scheduleModel.getDataByPremiereId(
          premiere.premiere_id
        )
        premiere.schedule_clock = fromSchedule.map(
          (schedule) => schedule.schedule_clock
        )
      }

      return wrapper.response(
        res,
        200,
        'Success Get All Premiere',
        result,
        pageInfo
      )
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error.message)
    }
  },

  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const { movieID, locationID, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieID,
        location_id: locationID,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_updated_at: new Date(Date.now())
      }
      const dataToUpdate = await premiereModel.getDataById(id)

      if (dataToUpdate.length > 0) {
        const result = await premiereModel.updateData(setData, id)
        return wrapper.response(
          res,
          200,
          'Success Update Data Premiere',
          result
        )
      } else {
        return wrapper.response(
          res,
          404,
          'Failed! No Data With Id ' + id + ' To Be Updated'
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const dataToDelete = await premiereModel.getDataById(id)

      if (dataToDelete.length > 0) {
        await premiereModel.deleteData(id)
        return wrapper.response(
          res,
          200,
          'Success Delete Premiere',
          dataToDelete
        )
      } else {
        return wrapper.response(
          res,
          404,
          'Failed! No Data With Id ' + id + ' To Be Deleted',
          null
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
