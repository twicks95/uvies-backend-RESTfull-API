const wrapper = require('../../helpers/wrapper')
// const pagination = require('../../helpers/pagination')
const scheduleModel = require('./schedule_model')

module.exports = {
  postSchedule: async (req, res) => {
    try {
      const { premiereID, scheduleDate, scheduleClock } = req.body
      const setData = {
        premiere_id: premiereID,
        schedule_date: scheduleDate,
        schedule_clock: scheduleClock
      }
      // console.log(setData)
      const result = await scheduleModel.createData(setData)
      return wrapper.response(res, 200, 'Success Create Data Schedule', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllSchedule: async (req, res) => {
    try {
      const result = await scheduleModel.getAllData()
      return wrapper.response(res, 200, 'Success Get All Data Schedule', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params
      const { premiereID, scheduleDate, scheduleClock } = req.body
      const setData = {
        premiere_id: premiereID,
        schedule_date: scheduleDate,
        schedule_clock: scheduleClock,
        schedule_updated_at: new Date(Date.now())
      }
      console.log(id)
      console.log(setData)
      const result = await scheduleModel.updateData(setData, id)
      return wrapper.response(res, 200, 'Success Update Data Schedule', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteSchedule: async (req, res) => {
    try {
      const { id } = req.params
      const dataToDelete = await scheduleModel.getDataById(id)

      if (dataToDelete.length > 0) {
        await scheduleModel.deleteData(id)
        return wrapper.response(
          res,
          200,
          'Success Delete Schedule',
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
