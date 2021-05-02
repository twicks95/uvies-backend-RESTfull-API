const db = require('../../config/mysql')

module.exports = {
  getEarnings: (whereClause) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT MONTH(booking_created_at) AS month, SUM(booking_total_price) AS total from booking ${whereClause} GROUP BY MONTH(booking_created_at)`,
        (error, result) => {
          !error ? resolve(result) : reject(error)
        }
      )
    })
  }
}
