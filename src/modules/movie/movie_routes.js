const express = require('express')
const route = express.Router()

const movieController = require('./movie_controller')

const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redis')
const uploadFile = require('../../middleware/uploads')

route.get('/', redisMiddleware.getMovieRedis, movieController.getAllMovie)
route.get(
  '/:id',
  redisMiddleware.getMovieByIdRedis,
  movieController.getMovieById
)
route.get('/upcoming/:month', movieController.getUpcomingMovieByMonth)
route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile('movie_poster'),
  redisMiddleware.clearDataMovieRedis,
  movieController.postMovie
)
route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile('movie_poster'),
  redisMiddleware.clearDataMovieRedis,
  movieController.updateMovie
)
route.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataMovieRedis,
  movieController.deleteMovie
)

module.exports = route
