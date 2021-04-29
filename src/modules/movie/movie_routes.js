const express = require('express')
const route = express.Router()

const movieController = require('./movie_controller')

const authMiddleWare = require('../../middleware/auth')
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
  authMiddleWare.authentication,
  authMiddleWare.isAdmin,
  uploadFile,
  redisMiddleware.clearDataMovieRedis,
  movieController.postMovie
)
route.patch(
  '/:id',
  authMiddleWare.authentication,
  authMiddleWare.isAdmin,
  uploadFile,
  redisMiddleware.clearDataMovieRedis,
  movieController.updateMovie
)
route.delete(
  '/:id',
  authMiddleWare.authentication,
  authMiddleWare.isAdmin,
  redisMiddleware.clearDataMovieRedis,
  movieController.deleteMovie
)

module.exports = route
