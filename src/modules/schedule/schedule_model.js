const db = require('../../config/mysql')

module.exports = {
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO schedule SET ?', setData, (error, result) => {
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

  getAllData: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM schedule', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
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

  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM schedule WHERE schedule_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
