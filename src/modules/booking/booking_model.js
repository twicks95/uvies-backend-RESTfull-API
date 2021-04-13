const db = require('../../config/mysql')

module.exports = {
  createDataToBooking: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO booking SET ?', setData, (error, result) => {
        if (!error) {
          // isi result hasil query insert into adalah objek yang berisi informasi dari proses insert, bukan isi data yang sedang dilakukan query
          // objek newResult dibuat karena akan diisi data-data yang diproses berisi apa aja yang kemudian akan dilempar ke parameter resolve
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
      // isi result hasil query select all from tabel adalah array of object yang berisi objek" setiap record di dalam tabel booking
      db.query('SELECT * FROM booking LIMIT ? OFFSET ?', [limit, offset], (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },

  getDataCount: () => {
    return new Promise((resolve, reject) => {
      // isi result adalah array dengan 1 object, objek nya berisi property bernama total yang nilainya adalah banyaknya data yang ada di tabel booking
      db.query('SELECT COUNT(*) AS total FROM booking', (error, result) => {
        !error ? resolve(result[0].total) : reject(new Error(error))
      })
    })
  }
}
