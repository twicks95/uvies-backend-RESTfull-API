const express = require('express')
const route = express.Router()

const movieController = require('./movie_controller')

route.get('/', movieController.getAllMovie)
route.get('/:id', movieController.getMovieById)
// Route.get('/title/:name', movieController.getMovieByName)
route.post('/', movieController.postMovie)
route.patch('/:id', movieController.updateMovie)
route.delete('/:id', movieController.deleteMovie)

module.exports = route
