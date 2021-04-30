const db = require('../../config/mysql')

module.exports = {
  getAllPremiereLocation: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM premiere_location', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },

  getPremiereLocationById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM premiere_location WHERE premiere_location_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  deletePremiereLocation: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM premiere_location WHERE premiere_location_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
