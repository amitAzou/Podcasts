const express = require('express')
const router = express.Router()
const { urlParamsSchemeValidator } = require('../middlewares/validiationMiddlewares')
const { idSchema } = require('../schemas/reviews')
const { getReviews } = require('../controllers/reviews')

router.get('/get-by-podcast/:id', urlParamsSchemeValidator(idSchema), getReviews)

module.exports = router
