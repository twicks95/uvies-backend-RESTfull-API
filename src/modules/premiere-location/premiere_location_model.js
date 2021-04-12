const connection = require('../../config/mysql')

module.exports = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM premiere_location', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }

  // createData: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query('INSERT INTO premiere_location WHERE')
  //   })
  // }
}
