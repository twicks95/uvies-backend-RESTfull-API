const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const routerNavigation = require('./routes')
require('dotenv').config()

const app = express() // Menjalankan express
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(cors())
app.options('*', cors())
app.use(helmet())
app.use(compression())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/api/v1', routerNavigation)
app.use('/api', express.static('src/uploads'))

// Menjalankan server dengan memanggil method listen yang dimiliki express
app.listen(port, () => {
  console.log(`Express app is listen to port ${port}`)
})
