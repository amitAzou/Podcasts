const express = require('express')
const routes = require('./routes/index.js')
const {useCache} = require('./middlewares/cacheMiddleware')
const {authenticateToken} = require('./middlewares/authenticationMiddleware')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const config = require('config')
app.use(express.static(path.join(__dirname, config.static)))
app.use(bodyParser.json())
app.use(authenticateToken)
app.use(useCache)
app.use(routes)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, config.static, 'index.html'))
})

module.exports = app
