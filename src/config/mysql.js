const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'uvies_app'
})

connection.connect((error) => {
  if (error) throw error
  console.log("You're now connected...")
})

module.exports = connection
