const db = require('../../config/mysql')

module.exports = {
  createDataSchedule: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO schedule SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM schedule WHERE schedule_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataByPremiereId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT schedule.schedule_id, schedule.schedule_clock FROM schedule WHERE premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getScheduleAndGroupByPremiereId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT schedule_date_start, schedule_date_end from schedule WHERE premiere_id = ? GROUP BY schedule_date_start',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataByPremiereClock: (id, clock) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM schedule WHERE premiere_id = ? AND schedule_clock = ?',
        [id, clock],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE schedule SET ? WHERE schedule_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  deleteDataById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM schedule WHERE schedule_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  deleteDataByPremiereId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM schedule WHERE premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
