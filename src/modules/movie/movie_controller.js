const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()

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

      const result = await movieModel.createData(setData)
      return wrapper.response(res, 200, 'Success Create Movie', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllMovie: async (req, res) => {
    try {
      let {
        page = '1',
        limit = '100',
        searchByName = '',
        sort = 'movie_id ASC'
      } = req.query

      page = parseInt(page)
      limit = parseInt(limit)
      let offset = 0
      offset = page * limit - limit

      const totalData = await movieModel.getDataCount(searchByName)
      const totalPage = Math.ceil(totalData / limit)
      const pageInfo = pagination.pageInfo(
        page,
        totalPage,
        limit,
        totalData,
        offset
      )

      const result = await movieModel.getAllData(
        searchByName,
        sort,
        limit,
        offset
      )

      if (result.length > 0) {
        client.setex(
          `getallmovie:${JSON.stringify(req.query)}`,
          3600,
          JSON.stringify({ result, pageInfo })
        )
        return wrapper.response(
          res,
          200,
          !searchByName
            ? 'Success Get All Movie'
            : 'Success Get Movies By Keyword',
          result,
          pageInfo
        )
      } else {
        client.setex(
          `getallmovie:${JSON.stringify(req.query)}`,
          3600,
          JSON.stringify({ result, pageInfo })
        )
        return wrapper.response(res, 404, 'Movie Not Found', null)
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
        // create redis key and insert result model to redis
        client.set(`getmovie:${id}`, JSON.stringify(result))
        // =============================

        return wrapper.response(res, 200, 'Success Get Movie By Id', result)
      } else {
        return wrapper.response(res, 404, `Not Data With Id ${id}`, null)
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
          'No Upcoming Movie For This Month',
          []
        )
      } else {
        return wrapper.response(res, 404, 'Not Found', null)
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
        movie_poster: req.file ? req.file.filename : '',
        movie_duration: movieDuration,
        movie_director: movieDirector,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis,
        movie_updated_at: new Date(Date.now())
      }

      const dataToUpdate = await movieModel.getDataById(id)
      if (dataToUpdate.length > 0) {
        const imageToDelete = dataToUpdate[0].movie_poster
        const isImageExist = fs.existsSync(
          `src/uploads/movie_poster/${imageToDelete}`
        )

        if (isImageExist && imageToDelete) {
          fs.unlink(`src/uploads/movie_poster/${imageToDelete}`, (err) => {
            if (err) throw err
          })
        }

        const result = await movieModel.updateData(setData, id)
        return wrapper.response(res, 200, 'Success Update Movie', result)
      } else {
        return wrapper.response(res, 404, 'Failed! No Data Is Updated')
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
        const imageToDelete = dataToDelete[0].movie_poster
        const isImageExist = fs.existsSync(
          `src/uploads/movie_poster/${imageToDelete}`
        )

        if (isImageExist) {
          fs.unlink(`src/uploads/movie_poster/${imageToDelete}`, (err) => {
            if (err) throw err
          })
        }

        await movieModel.deleteData(id)
        return wrapper.response(res, 200, 'Success Delete Movie', dataToDelete)
      } else {
        return wrapper.response(res, 404, 'Failed! No Data Is Deleted', null)
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
