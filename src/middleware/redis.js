const redis = require('redis')
const client = redis.createClient()
const wrapper = require('../helpers/wrapper')

module.exports = {
  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getmovie:${id}`, (error, result) => {
      if (!error && result != null) {
        // console.log('Data ada di redis')
        return wrapper.response(
          res,
          200,
          'Success Get Movie By Id',
          JSON.parse(result)
        )
      } else {
        // console.log('Tidak ada di redis')
        next()
      }
    })
  },

  getMovieRedis: (req, res, next) => {
    client.get(`getallmovie:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('Data ada di redis')
        const newResult = JSON.parse(result) // {data, pagination}
        // console.log(newResult.result)
        return wrapper.response(
          res,
          200,
          'Success Get All Movie',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('Tidak ada di redis')
        next()
      }
    })
  },

  clearDataMovieRedis: (req, res, next) => {
    // cari kunci yang berawalan getmovie
    client.keys('getallmovie*', (_error, result) => {
      // console.log(result)
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
