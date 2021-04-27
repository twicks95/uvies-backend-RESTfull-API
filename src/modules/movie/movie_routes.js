const express = require('express')
const route = express.Router()

const movieController = require('./movie_controller')

const authMiddleWare = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

route.get('/', movieController.getAllMovie)
route.get('/:id', movieController.getMovieById)
route.get('/upcoming/:month', movieController.getUpcomingMovieByMonth)
route.post(
  '/',
  authMiddleWare.authentication,
  authMiddleWare.isAdmin,
  uploadFile,
  movieController.postMovie
)
route.patch('/:id', movieController.updateMovie)
route.delete('/:id', movieController.deleteMovie)

module.exports = route
