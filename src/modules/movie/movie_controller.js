const wrapper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  // sayHello: (req, res) => {
  //   res.status(200).send('Hello World')
  // },

  getAllMovie: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await movieModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await movieModel.getAllData(limit, offset)
      return wrapper.response(
        res,
        200,
        'Success Get All Movie',
        result,
        pageInfo
      )
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getDataById(id)

      if (result.length > 0) {
        return wrapper.response(
          res,
          200,
          'Success Get Movie By Id',
          result
        )
      } else {
        return wrapper.response(res, 404, 'Data With Id ' + id + ' Not Found', null)
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getMovieByName: async (req, res) => {
    try {
      const { name } = req.params
      const result = await movieModel.getDataByName(name)

      if (result.length > 0) {
        return wrapper.response(
          res,
          200,
          'Success Get Movie By Name',
          result
        )
      } else {
        return wrapper.response(res, 404, 'No Movie Found!', null)
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  postMovie: async (req, res) => {
    try {
      console.log(req.body)
      const { movieName, movieCategory, movieReleaseDate } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate
      }
      const result = await movieModel.createData(setData)
      return wrapper.response(res, 200, 'Success Create Movie', result)
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
      const result = await movieModel.updateData(setData, id)
      return wrapper.response(res, 200, 'Success Update Movie', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.deleteData(id)
      // console.log(req.params)
      // console.log(result.affectedRows)
      if (result.affectedRows > 0) {
        return wrapper.response(res, 200, 'Success Delete Movie', result)
      } else {
        return wrapper.response(res, 404, 'Failed! No Data With Id ' + id + ' To Be Deleted', result)
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
