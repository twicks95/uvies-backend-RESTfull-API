const db = require('../../config/mysql')

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO user SET ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  getDataConditions: (data) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM user WHERE ?', data, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },

  resetPassword: (setData, email) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE user SET ? WHERE user_email = ?',
        [setData, email],
        (error, result) => {
          if (!error) {
            const newResult = {
              affected: result.affectedRows,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
