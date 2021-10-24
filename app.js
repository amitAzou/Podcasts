const express = require('express')
const routes = require('./routes/index.js')
const { getItemFromCache } = require('./middlewares/cacheMiddleware')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(getItemFromCache)
app.use(routes)

module.exports = app
