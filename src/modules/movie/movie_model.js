const db = require('../../config/mysql')

module.exports = {
  getAllData: (searchKeyword, order, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM movie WHERE movie_name LIKE "%"?"%" ORDER BY ${order} LIMIT ${limit} OFFSET ?`,
        [searchKeyword, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataCount: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS total FROM movie', (error, result) => {
        !error ? resolve(result[0].total) : reject(new Error(error))
      })
    })
  },

  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM movie WHERE movie_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  createData: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO movie SET ?', setData, (error, result) => {
        // !error ? resolve({id: result.insertId, ...setData}) : reject(new Error(error))
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

  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE movie SET ? WHERE movie_id = ?',
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
      db.query('DELETE FROM movie WHERE movie_id = ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
