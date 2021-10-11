const express = require('express')
const app = express()
const config = require('config')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.listen(config.port)

const routes = require('../Podcasts/routes/podcast')

console.log(`listening on port ${config.port}...`)

app.use(routes)

module.exports = app
