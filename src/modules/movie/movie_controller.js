const wrapper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },

  getAllMovie: async (req, res) => {
    try {
      console.log('Proses get all movie works !')
      const result = await movieModel.getDataAll()
      return wrapper.response(res, 200, 'Get Data Successfully', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
