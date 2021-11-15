const express = require('express')
const routes = require('./routes/index.js')
const { getItemFromCache } = require('./middlewares/cacheMiddleware')
const { authenticateToken } = require('./middlewares/authenticationMiddleware')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(authenticateToken)
app.use(getItemFromCache)
app.use(routes)

module.exports = app
