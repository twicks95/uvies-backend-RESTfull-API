const wrapper = require('../../helpers/wrapper')
const pagination = require('../../helpers/pagination')
const movieModel = require('./movie_model')

module.exports = {
  postMovie: async (req, res) => {
    try {
      const {
        movieName,
        movieCategory,
        movieReleaseDate,
        movieDuration,
        movieDirector,
        movieCasts,
        movieSynopsis
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_poster: req.file ? req.file.filename : '',
        movie_duration: movieDuration,
        movie_director: movieDirector,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis
      }

      // console.log(setData)
      const result = await movieModel.createData(setData)
      return wrapper.response(res, 200, 'Success Create Movie', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllMovie: async (req, res) => {
    try {
      let { page, limit, searchByName, sort } = req.query

      page = !page ? '1' : page
      limit = !limit ? 10000 : limit
      searchByName = !searchByName ? '' : searchByName
      sort = !sort ? 'movie_id ASC' : sort

      page = parseInt(page)
      limit = parseInt(limit)
      let offset = 0

      const result = await movieModel.getAllData(
        searchByName,
        sort,
        limit,
        offset
      )

      // Proses untuk data pagination
      const sortForQueryCount = sort.split(' ')
      console.log(sortForQueryCount)
      const table =
        sortForQueryCount[0] === 'movie_id' ? 'movie_name' : 'movie_name'

      const totalData = await movieModel.getDataCount(table, searchByName)
      const totalPage = Math.ceil(totalData / limit)
      offset = page * limit - limit
      const pageInfo = pagination.pageInfo(page, totalPage, limit, totalData)

      if (result.length < 1) {
        return wrapper.response(
          res,
          200,
          `No Movie Matched By Keyword '${searchByName}'`,
          result
        )
      } else if (searchByName && result.length > 0) {
        return wrapper.response(
          res,
          200,
          `Success Get All Movie By Keyword '${searchByName}'`,
          result,
          pageInfo
        )
      } else {
        return wrapper.response(
          res,
          200,
          'Success Get All Movie',
          result,
          pageInfo
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getDataById(id)

      if (result.length > 0) {
        return wrapper.response(res, 200, 'Success Get Movie By Id', result)
      } else {
        return wrapper.response(
          res,
          404,
          'Data With Id ' + id + ' Not Found',
          null
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getUpcomingMovieByMonth: async (req, res) => {
    try {
      let { month, limit } = req.params

      limit = !limit ? 1000 : parseInt(limit)

      const result = await movieModel.getDataByMonthForUpcomingMovie(
        month,
        limit
      )

      if (result.length > 0) {
        return wrapper.response(
          res,
          200,
          'Success Get Upcoming Movie By Month',
          result
        )
      } else if (result.length === 0) {
        return wrapper.response(
          res,
          200,
          'Success Get Upcoming Movie By Month',
          []
        )
      } else {
        return wrapper.response(res, 200, 'Not Found', null)
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      const {
        movieName,
        movieCategory,
        movieDuration,
        movieDirector,
        movieCasts,
        movieSynopsis,
        movieReleaseDate
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_duration: movieDuration,
        movie_director: movieDirector,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis,
        movie_updated_at: new Date(Date.now())
      }
      const dataToUpdate = await movieModel.getDataById(id)

      if (dataToUpdate.length > 0) {
        const result = await movieModel.updateData(setData, id)
        return wrapper.response(res, 200, 'Success Update Movie', result)
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

  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const dataToDelete = await movieModel.getDataById(id)

      if (dataToDelete.length > 0) {
        await movieModel.deleteData(id)
        return wrapper.response(res, 200, 'Success Delete Movie', dataToDelete)
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
