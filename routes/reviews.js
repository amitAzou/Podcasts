const express = require('express')
const router = express.Router()
const { urlParamsSchemeValidator, requestSchemeValidator } = require('../middlewares/validiationMiddlewares')
const { idSchema, addReviewSchema } = require('../schemas/reviews')
const { getReviews, addReview } = require('../controllers/reviews')

router.get('/get-by-podcast/:id', urlParamsSchemeValidator(idSchema), getReviews)

router.post('/new', requestSchemeValidator(addReviewSchema), addReview)

module.exports = router
