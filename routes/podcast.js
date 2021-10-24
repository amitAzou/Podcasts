const express = require('express')
const router = express.Router()
const { getPodcast, addPodcast, updatePodcast, deletePodcast, searchPodcast, getBestPodcasts } = require('../controllers/podcast')
const { urlSchema, updateSchema, addSchema } = require('../schemas/podcast')
const { urlParamsSchemeValidator, requestSchemeValidator } = require('../middlewares/validiationMiddlewares')

router.get('/:id', urlParamsSchemeValidator(urlSchema), getPodcast)

router.post('/new', requestSchemeValidator(addSchema), addPodcast)

router.delete('/:id', urlParamsSchemeValidator(urlSchema), deletePodcast)

router.put('/:id', urlParamsSchemeValidator(urlSchema), requestSchemeValidator(updateSchema), updatePodcast)

router.get('/search/:query', urlParamsSchemeValidator(urlSchema), searchPodcast)

router.get('/best/:number', urlParamsSchemeValidator(urlSchema), getBestPodcasts)

module.exports = router
