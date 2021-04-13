const express = require('express')
const Route = express.Router()
// 1
// const { sayHello } = require('./movie_controller')
// 2
const movieController = require('./movie_controller')

// 1
// Route.get('/hello', sayHello)
// 2
// Route.get('/hello', movieController.sayHello)
Route.get('/', movieController.getAllMovie)
// Route.get('/:id', movieController.getMovieById)
// Route.get('/title/:name', movieController.getMovieByName)
Route.post('/', movieController.postMovie)
Route.patch('/:id', movieController.updateMovie)
Route.delete('/:id', movieController.deleteMovie)

module.exports = Route
