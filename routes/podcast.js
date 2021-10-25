const express = require('express')
const router = express.Router()
const { getPodcast, addPodcast, updatePodcast, deletePodcast, searchPodcast, getBestPodcasts } = require('../controllers/podcast')
const { updateSchema, addSchema, idSchema, querySchema, numberSchema } = require('../schemas/podcast')
const { urlParamsSchemeValidator, requestSchemeValidator } = require('../middlewares/validiationMiddlewares')

router.get('/:id', urlParamsSchemeValidator(idSchema), getPodcast)

router.post('/new', requestSchemeValidator(addSchema), addPodcast)

router.delete('/:id', urlParamsSchemeValidator(idSchema), deletePodcast)

router.put('/:id', urlParamsSchemeValidator(idSchema), requestSchemeValidator(updateSchema), updatePodcast)

router.get('/search/:query', urlParamsSchemeValidator(querySchema), searchPodcast)

router.get('/best/:number', urlParamsSchemeValidator(numberSchema), getBestPodcasts)

module.exports = router
