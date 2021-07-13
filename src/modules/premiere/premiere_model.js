const db = require('../../config/mysql')

module.exports = {
  createDataPremiere: (setData) => {
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

  getAllData: (condition, order, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT premiere.movie_id, movie.movie_name, movie.movie_poster, premiere.premiere_id, premiere.premiere_name, premiere.premiere_price, premiere_location.location_id, premiere_location.location_city, premiere_location.location_address, schedule.schedule_id, schedule.schedule_date_start, schedule.schedule_date_end FROM premiere 
        JOIN premiere_location ON premiere.location_id = premiere_location.location_id 
        JOIN movie ON premiere.movie_id = movie.movie_id
        JOIN schedule ON premiere.premiere_id = schedule.premiere_id  
        WHERE ${condition} GROUP BY schedule.premiere_id ORDER BY premiere.${order} LIMIT ? OFFSET ?`,
        [limit, offset],
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

  getDataCount: (condition) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total FROM premiere 
        JOIN premiere_location ON premiere.location_id = premiere_location.location_id 
        JOIN movie ON premiere.movie_id = movie.movie_id
        JOIN schedule ON premiere.premiere_id = schedule.premiere_id
        WHERE ${condition}`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },

  getDataCountWithoutJoinSchedule: (condition) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total FROM premiere 
        JOIN premiere_location ON premiere.location_id = premiere_location.location_id 
        JOIN movie ON premiere.movie_id = movie.movie_id
        WHERE ${condition}`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
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
      db.query(
        'UPDATE premiere SET ? WHERE premiere_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newData = {
              id: id,
              ...setData
            }
            resolve(newData)
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
        'DELETE FROM premiere WHERE premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
