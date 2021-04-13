const db = require('../../config/mysql')

module.exports = {
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO premiere SET ?', setData, (error, result) => {
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

  getAllData: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM premiere LIMIT ? OFFSET ?',
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataCount: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS total FROM premiere', (error, result) => {
        !error ? resolve(result[0].total) : reject(new Error(error))
      })
    })
  },

  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM premiere WHERE premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE premiere SET ? WHERE premiere_id = ?', [setData, id], (error, result) => {
        if (!error) {
          const newData = {
            id: id,
            ...setData
          }
          resolve(newData)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM premiere WHERE premiere_id = ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
