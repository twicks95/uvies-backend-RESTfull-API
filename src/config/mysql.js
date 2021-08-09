require('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

db.connect((error) => {
  if (error) throw error
  console.log("You're now connected...")
})

module.exports = db
