const express = require('express')
const route = express.Router()

const { authentication, isAdmin } = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redis')
const uploadFile = require('../../middleware/uploads')
const {
  getAllMovie,
  getMovieById,
  getNowShowing,
  getUpcomingMovieByMonth,
  postMovie,
  postMovieImage,
  updateMovie,
  updateMovieImage,
  deleteMovie,
  deleteMovieImage
} = require('./movie_controller')

route.get('/now-showing', getNowShowing)
route.get('/', redisMiddleware.getMovieRedis, getAllMovie)
route.get('/:id', redisMiddleware.getMovieByIdRedis, getMovieById)
route.get('/upcoming/:month', getUpcomingMovieByMonth)
route.post(
  '/',
  authentication,
  isAdmin,
  redisMiddleware.clearDataMovieRedis,
  postMovie
)
route.post(
  '/image',
  authentication,
  isAdmin,
  uploadFile('movie_poster'),
  redisMiddleware.clearDataMovieRedis,
  postMovieImage
)
route.patch(
  '/:id',
  authentication,
  isAdmin,
  redisMiddleware.clearDataMovieRedis,
  updateMovie
)
route.patch(
  '/image/:id',
  authentication,
  isAdmin,
  uploadFile('movie_poster'),
  redisMiddleware.clearDataMovieRedis,
  updateMovieImage
)
route.delete(
  '/:id',
  authentication,
  isAdmin,
  redisMiddleware.clearDataMovieRedis,
  deleteMovie
)
route.delete(
  '/image/:id',
  authentication,
  isAdmin,
  redisMiddleware.clearDataMovieRedis,
  deleteMovieImage
)

module.exports = route
