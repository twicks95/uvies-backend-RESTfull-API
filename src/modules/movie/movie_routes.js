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
  redisMiddleware.clearDataMovieRedis,
  movieController.postMovie
)
route.post(
  '/image',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile('movie_poster'),
  redisMiddleware.clearDataMovieRedis,
  movieController.postMovieImage
)
route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataMovieRedis,
  movieController.updateMovie
)
route.patch(
  '/image/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile('movie_poster'),
  redisMiddleware.clearDataMovieRedis,
  movieController.updateMovieImage
)
route.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataMovieRedis,
  movieController.deleteMovie
)
route.delete(
  '/image/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataMovieRedis,
  movieController.deleteMovieImage
)

module.exports = route
