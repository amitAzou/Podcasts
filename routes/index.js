const express = require('express')
const router = express.Router()
const podcasts = require('./podcast')
const reviews = require('./reviews')

router.use('/podcast', podcasts)
router.use('/reviews', reviews)

module.exports = router
