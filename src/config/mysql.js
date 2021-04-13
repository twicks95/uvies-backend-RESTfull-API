const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'uvies_app'
})

db.connect((error) => {
  if (error) throw error
  console.log("You're now connected...")
})

module.exports = db
