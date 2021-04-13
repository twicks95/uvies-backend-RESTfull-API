const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const routerNavigation = require('./routes')

const app = express() // Menjalankan express
const port = 3000

// app.use(env)
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

// Menjalankan server dengan memanggil method listen yang dimiliki express
app.listen(port, () => {
  console.log('Express app is listen to port 3000!')
})
