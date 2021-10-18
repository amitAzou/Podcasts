const express = require('express')
const routes = require('./routes/index.js')
const { getItemFromCache } = require('./middlewares/cacheMiddleware')
const config = require('config')
const bodyParser = require('body-parser')
const app = express()
app.listen(config.port)
console.log(`listening on port ${config.port}...`)
app.use(bodyParser.json())
app.use(getItemFromCache)
app.use(routes)

module.exports = app
