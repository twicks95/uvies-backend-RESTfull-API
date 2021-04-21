const wrapper = require('../../helpers/wrapper')
const pagination = require('../../helpers/pagination')
const premiereModel = require('./premiere_model')

module.exports = {
  postPremiere: async (req, res) => {
    try {
      const { movieID, locationID, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieID,
        location_id: locationID,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }
      const result = await premiereModel.createData(setData)
      return wrapper.response(res, 200, 'Success Create Data Premiere', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllPremiere: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await premiereModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = pagination.pageInfo(page, totalPage, limit, totalData)

      const result = await premiereModel.getAllData(limit, offset)
      return wrapper.response(
        res,
        200,
        'Success Get All Premiere Data',
        result,
        pageInfo
      )
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const { movieID, locationID, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieID,
        location_id: locationID,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_updated_at: new Date(Date.now())
      }
      const dataToUpdate = await premiereModel.getDataById(id)

      if (dataToUpdate.length > 0) {
        const result = await premiereModel.updateData(setData, id)
        return wrapper.response(res, 200, 'Success Update Data Premiere', result)
      } else {
        return wrapper.response(res, 404, 'Failed! No Data With Id ' + id + ' To Be Updated')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const dataToDelete = await premiereModel.getDataById(id)

      if (dataToDelete.length > 0) {
        await premiereModel.deleteData(id)
        return wrapper.response(
          res,
          200,
          'Success Delete Premiere',
          dataToDelete
        )
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
