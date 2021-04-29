const db = require('../../config/mysql')

module.exports = {
  updateUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE user SET ? WHERE user_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id,
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

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM user WHERE user_id = ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
