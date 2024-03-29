const db = require('../../config/mysql')

module.exports = {
  getAllData: (searchKeyword, order, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM movie WHERE movie_name LIKE "%"?"%" ORDER BY ${order} LIMIT ? OFFSET ?`,
        [searchKeyword, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getNowShowing: (date, order, limit) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT premiere.movie_id, movie.movie_name, movie.movie_poster, movie.movie_category FROM premiere 
        JOIN premiere_location ON premiere.location_id = premiere_location.location_id 
        JOIN movie ON premiere.movie_id = movie.movie_id
        JOIN schedule ON premiere.premiere_id = schedule.premiere_id  
        WHERE schedule.schedule_date_start <= ? AND schedule.schedule_date_end >= ? GROUP BY movie.movie_id ORDER BY movie.${order} LIMIT ?`,
        [date, date, limit],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  getDataCount: (searchKeyword) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT COUNT(*) AS total FROM movie WHERE movie_name LIKE "%"?"%"',
        searchKeyword,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
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

  getDataByMonthForUpcomingMovie: (month, limit) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM movie WHERE MONTH(movie_release_date) = ? AND YEAR(movie_release_date) >= YEAR(NOW()) ORDER BY movie_release_date ASC LIMIT ?',
        [month, limit],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  createData: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO movie SET ?', setData, (error, result) => {
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
