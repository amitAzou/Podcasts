const express = require('express')
const router = express.Router()
const { getPodcast, addPodcast, updatePodcast, deletePodcast, searchPodcast, getPodcastsByRating } = require('../controllers/podcast')
const { updateSchema, addSchema, idSchema, querySchema } = require('../schemas/podcast')
const { urlParamsSchemeValidator, requestSchemeValidator } = require('../middlewares/validiationMiddlewares')

router.get('/:id', urlParamsSchemeValidator(idSchema), getPodcast)

router.post('/new', requestSchemeValidator(addSchema), addPodcast)

router.delete('/:id', urlParamsSchemeValidator(idSchema), deletePodcast)

router.put('/:id', urlParamsSchemeValidator(idSchema), requestSchemeValidator(updateSchema), updatePodcast)

router.get('/search/:query', urlParamsSchemeValidator(querySchema), searchPodcast)

router.get('/rating/all', getPodcastsByRating)

module.exports = router
