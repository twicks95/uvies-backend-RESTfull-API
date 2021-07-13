const wrapper = require('../../helpers/wrapper')
const pagination = require('../../helpers/pagination')
const premiereModel = require('./premiere_model')
const scheduleModel = require('../schedule/schedule_model')

module.exports = {
  postPremiere: async (req, res) => {
    try {
      const {
        movieId,
        locationId,
        premiereName,
        premierePrice,
        scheduleDateStart,
        scheduleDateEnd,
        scheduleClock
      } = req.body

      const setDataPremiere = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }
      const resultPremiere = await premiereModel.createDataPremiere(
        setDataPremiere
      )

      const newResultPremiere = {
        ...resultPremiere,
        schedule_date_start: scheduleDateStart,
        schedule_date_end: scheduleDateEnd,
        scheduleClock: scheduleClock
      }

      const premiereId = resultPremiere.id
      await scheduleClock.forEach((element) => {
        const setDataSchedule = {
          premiere_id: premiereId,
          schedule_date_start: scheduleDateStart,
          schedule_date_end: scheduleDateEnd,
          schedule_clock: element
        }
        scheduleModel.createDataSchedule(setDataSchedule)
      })

      return wrapper.response(
        res,
        200,
        'Success Create Data Premiere',
        newResultPremiere
      )
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error.message)
    }
  },

  getAllPremiere: async (req, res) => {
    try {
      let {
        id = '',
        date = '',
        location = '',
        movie = '',
        order = 'premiere_id ASC',
        page = '1',
        limit = '100'
      } = req.query

      const movieIdStatement = id
        ? `premiere.movie_id = ${id}`
        : 'premiere.movie_id LIKE "%%"'

      let queryCondition
      if (location && movie) {
        queryCondition = `premiere_location.location_city LIKE "%${location}%" AND movie.movie_name LIKE "%${movie}%" AND ${movieIdStatement}`
      } else if (location && date) {
        queryCondition = `premiere_location.location_city LIKE "%${location}%" AND schedule.schedule_date_start = '${date}' AND ${movieIdStatement}`
      } else if (date) {
        queryCondition = `schedule.schedule_date_start = '${date}' AND ${movieIdStatement}`
      } else if (location) {
        queryCondition = `premiere_location.location_city LIKE "%${location}%" AND ${movieIdStatement}`
      } else if (movie) {
        queryCondition = `movie.movie_name LIKE "%${movie}%" AND ${movieIdStatement}`
      } else {
        queryCondition = `${movieIdStatement}`
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
        premiere.schedule_clock_data = fromSchedule
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

  getAllPremiereWithoutJoinSchedule: async (req, res) => {
    try {
      let {
        movieId = '',
        premiereId = '',
        location = '',
        movie = '',
        order,
        page,
        limit
      } = req.query

      if (!order) {
        order = 'premiere_id ASC'
      }
      if (!page) {
        page = '1'
      }
      if (!limit) {
        limit = '10'
      }

      console.log(movieId, premiereId, location, movie, order, page, limit)

      const movieIdStatement = movieId
        ? `premiere.movie_id = ${movieId}`
        : 'premiere.movie_id LIKE "%%"'

      const premiereIdStatement = premiereId
        ? `premiere.premiere_id = ${premiereId}`
        : 'premiere.premiere_id LIKE "%%"'

      const locationNameStatement = location
        ? `premiere_location.location_city = '${location}'`
        : 'premiere_location.location_city LIKE "%%"'

      let queryCondition
      if (location && movie) {
        queryCondition = `${locationNameStatement} AND movie.movie_name LIKE "%${movie}%" AND ${movieIdStatement}`
      } else if (location) {
        queryCondition = `${locationNameStatement} AND ${movieIdStatement}`
      } else if (movie) {
        queryCondition = `movie.movie_name LIKE "%${movie}%" AND ${movieIdStatement}`
      } else if (movieId) {
        queryCondition = `${movieIdStatement}`
      } else {
        queryCondition = `${premiereIdStatement}`
      }

      page = parseInt(page)
      limit = parseInt(limit)
      let offset = 0
      offset = page * limit - limit
      const totalData = await premiereModel.getDataCountWithoutJoinSchedule(
        queryCondition
      )
      const totalPage = Math.ceil(totalData / limit)
      const pageInfo = pagination.pageInfo(
        page,
        totalPage,
        limit,
        totalData,
        offset
      )

      console.log(pageInfo)

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
        premiere.schedule_clock_data = fromSchedule
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
      const { movieId, locationId, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
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
        await scheduleModel.deleteDataByPremiereId(id)
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
