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

  getBookingSeatData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT booking_seat.booking_seat_id, booking_seat.booking_seat_location FROM booking_seat WHERE booking_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getAllDataByUserId: (id, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM booking JOIN movie ON booking.movie_id = movie.movie_id JOIN premiere ON booking.premiere_id = premiere.premiere_id JOIN premiere_location ON booking.location_id = premiere_location.location_id JOIN schedule ON booking.schedule_id = schedule.schedule_id WHERE user_id = ? LIMIT ? OFFSET ?',
        [id, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getAllDataByBookingId: (id, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM booking JOIN movie ON booking.movie_id = movie.movie_id JOIN premiere ON booking.premiere_id = premiere.premiere_id JOIN premiere_location ON booking.location_id = premiere_location.location_id JOIN schedule ON booking.schedule_id = schedule.schedule_id WHERE booking_id = ? LIMIT ? OFFSET ?',
        [id, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataCountByUserId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT COUNT(*) AS total FROM booking WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },

  getDataCountByBookingId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT COUNT(*) AS total FROM booking WHERE booking_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },

  getBookedSeat: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT premiere.premiere_name, movie.movie_name, schedule.schedule_date_start, schedule.schedule_clock, booking_seat.booking_seat_location FROM booking JOIN premiere ON booking.premiere_id = premiere.premiere_id JOIN movie ON booking.movie_id = movie.movie_id JOIN booking_seat ON booking_seat.booking_id = booking.booking_id JOIN schedule ON booking.schedule_id = schedule.schedule_id WHERE booking.premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getTotalEarnings: (movie, premiere, location) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT MONTH(booking_created_at) AS month, SUM(booking_total_price) AS total, premiere.premiere_name FROM booking JOIN premiere ON booking.premiere_id = premiere.premiere_id WHERE YEAR(booking_created_at) = YEAR(NOW()) AND premiere.${movie} AND premiere.premiere_name LIKE "%"?"%" AND premiere.${location} GROUP BY MONTH(booking.booking_created_at)`,
        premiere,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
    // SELECT MONTH(booking_created_at) AS month, SUM(booking_total_price) AS total, premiere.premiere_name FROM booking JOIN premiere ON booking.premiere_id = premiere.premiere_id JOIN movie ON movie.movie_id = booking.movie_id WHERE YEAR(booking_created_at) = YEAR(NOW()) AND movie.movie_id = '7' GROUP BY MONTH(booking.booking_created_at)

    // SELECT MONTH(booking_created_at) AS month,SUM(booking_total_price) AS total,premiere.movie_id,premiere.premiere_name FROM booking JOIN premiere ON booking.premiere_id = premiere.premiere_id WHERE YEAR(booking_created_at) = YEAR(NOW()) AND premiere.movie_id = '70' AND premiere.premiere_name LIKE "%""%" GROUP BY MONTH(booking_created_at)
  }
}
