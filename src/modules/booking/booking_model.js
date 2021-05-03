const db = require('../../config/mysql')

module.exports = {
  createDataToBooking: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO booking SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  createDataToBookingSeat: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO booking_seat SET ?', setData, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },

  getAllData: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM booking LIMIT ? OFFSET ?',
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataCount: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS total FROM booking', (error, result) => {
        !error ? resolve(result[0].total) : reject(new Error(error))
      })
    })
  }
}
