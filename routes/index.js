const express = require('express')
const router = express.Router()
const podcasts = require('./podcast')

router.use('/podcast', podcasts)

module.exports = router
