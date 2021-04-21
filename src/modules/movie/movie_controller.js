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
        movie_duration: movieDuration,
        movie_director: movieDirector,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis
      }
      const result = await movieModel.createData(setData)
      return wrapper.response(res, 200, 'Success Create Movie', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllMovie: async (req, res) => {
    try {
      let { page, limit, searchByName, sort } = req.query

      if (!page) {
        page = '1'
      }
      if (!limit) {
        limit = '10000'
      }
      if (!searchByName) {
        searchByName = ''
      }
      if (!sort) {
        sort = 'movie_id ASC'
      }

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
      const totalData = await result.length
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

  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      const { movieName, movieCategory, movieReleaseDate } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
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
