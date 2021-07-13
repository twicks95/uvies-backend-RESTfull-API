const wrapper = require('../../helpers/wrapper')
const scheduleModel = require('./schedule_model')

module.exports = {
  postSchedule: async (req, res) => {
    try {
      const { premiereID, scheduleDateStart, scheduleDateEnd, scheduleClock } =
        req.body

      await scheduleClock.forEach((element) => {
        const setData = {
          premiere_id: premiereID,
          schedule_date_start: scheduleDateStart,
          schedule_date_end: scheduleDateEnd,
          schedule_clock: element
        }
        scheduleModel.createDataSchedule(setData)
      })
      return wrapper.response(res, 200, 'Success Create Data Schedule')
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getScheduleByPremiereId: async (req, res) => {
    try {
      const { id } = req.params

      const result = await scheduleModel.getDataByPremiereId(id)
      if (result.length > 0) {
        return wrapper.response(
          res,
          200,
          `Success Get All Data Schedule by Premiere ID ${id}`,
          result
        )
      } else {
        return wrapper.response(res, 404, 'No Data Schedule', [])
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  getScheduleByPremiereClock: async (req, res) => {
    try {
      const { premiereId, clock } = req.query
      const result = await scheduleModel.getDataByPremiereClock(
        premiereId,
        clock
      )
      return wrapper.response(res, 200, 'Success Get Schedule By Clock', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params

      // const result = await premiereModel.getDataById(id)
      const { premiereID, scheduleDate, scheduleClock } = req.body
      const setData = {
        premiere_id: premiereID,
        schedule_date: scheduleDate,
        schedule_clock: scheduleClock,
        schedule_updated_at: new Date(Date.now())
      }

      const dataToUpdate = await scheduleModel.getDataById(id)

      if (dataToUpdate.length > 0) {
        const result = await scheduleModel.updateData(setData, id)
        return wrapper.response(
          res,
          200,
          'Success Update Data Schedule',
          result
        )
      } else {
        return wrapper.response(
          res,
          404,
          'Failed! No Data With Id ' + id + ' To Be Updated'
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteScheduleById: async (req, res) => {
    try {
      const { id } = req.params
      const dataToDelete = await scheduleModel.getDataById(id)

      if (dataToDelete.length > 0) {
        await scheduleModel.deleteDataById(id)
        return wrapper.response(
          res,
          200,
          `Success Delete Schedule By Id ${id}`,
          dataToDelete
        )
      } else {
        return wrapper.response(
          res,
          404,
          `Failed! No Data With Id ${id} To Be Deleted`,
          null
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteScheduleByPremiereId: async (req, res) => {
    try {
      const { id } = req.params
      const dataToDelete = await scheduleModel.getDataByPremiereId(id)

      if (dataToDelete.length > 0) {
        await scheduleModel.deleteDataByPremiereId(id)
        return wrapper.response(
          res,
          200,
          `Success Delete Schedule By Premiere Id ${id}`,
          dataToDelete
        )
      } else {
        return wrapper.response(
          res,
          404,
          `Failed! No Data With Premiere Id ${id} To Be Deleted`,
          null
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
