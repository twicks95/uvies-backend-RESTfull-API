const wrapper = require('../../helpers/wrapper')
const pagination = require('../../helpers/pagination')
const movieModel = require('./movie_model')

module.exports = {
  postMovie: async (req, res) => {
    try {
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

  getAllMovie: async (req, res) => {
    try {
      // req.query = { keyword: 'an', limit: '3', offset: '0', sort: 'movie_name ASC' }
      let { page, limit, searchByName, sort } = req.query
      // console.log({sort}) // undefined if none
      page = parseInt(page)
      limit = parseInt(limit)

      if (!searchByName) {
        searchByName = ''
      } else if (!sort) {
        sort = 'movie_id ASC'
      }

      // console.log(searchByName)
      // console.log(sort)

      // Proses untuk data pagination
      const totalData = await movieModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = pagination.pageInfo(page, totalPage, limit, totalData)
      // end#
      const result = await movieModel.getAllData(
        searchByName,
        sort,
        limit,
        offset
      )
      // console.log(result)

      if (searchByName && sort === 'movie_id ASC') {
        return wrapper.response(
          res,
          200,
          `Success Get All Movie By Keyword ${searchByName}`,
          result,
          pageInfo
        )
      } else if (
        (searchByName && sort === 'movie_name ASC') ||
        sort === 'movie_name DESC'
      ) {
        sort = sort.split(' ')
        return wrapper.response(
          res,
          200,
          `Success Get All Movie Keyword = '${searchByName}' and Ordered By ${sort[0]} ${sort[1]}`,
          result,
          pageInfo
        )
      } else if (
        (searchByName && sort === 'movie_release_date ASC') ||
        sort === 'movie_release_date DESC'
      ) {
        sort = sort.split(' ')
        return wrapper.response(
          res,
          200,
          `Success Get All Movie Keyword = '${searchByName}' and Ordered By ${sort[0]} ${sort[1]}`,
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
      const result = await movieModel.updateData(setData, id)
      return wrapper.response(res, 200, 'Success Update Movie', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const dataToDelete = await movieModel.getDataById(id)
      console.log(dataToDelete)

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
