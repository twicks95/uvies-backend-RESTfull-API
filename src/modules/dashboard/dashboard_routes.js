const express = require('express')
const route = express.Router()

const authMiddleware = require('../../middleware/auth')

const dashboardController = require('./dashboard_controller')

route.get('/', authMiddleware.isAdmin, dashboardController.getAllEarnings)

module.exports = route
