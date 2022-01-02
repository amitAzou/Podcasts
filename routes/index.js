const express = require('express')
const router = express.Router()
const podcasts = require('./podcast')
const reviews = require('./reviews')
const login = require('./login')

router.use('/podcast/', podcasts)
router.use('/reviews', reviews)
router.use('/login', login)

module.exports = router
