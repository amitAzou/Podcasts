const express = require('express')
const router = express.Router()
const { getPodcast, addPodcast, updatePodcast, deletePodcast } = require('../controllers/podcast')
const { idSchema, updateSchema, addSchema } = require('../schemas/podcast')
const { urlParamsSchemeValidator, requestSchemeValidator } = require('../middlewares/validiationMiddlewares')

router.get('/:id', urlParamsSchemeValidator(idSchema), getPodcast)

router.post('/new', requestSchemeValidator(addSchema), addPodcast)

router.delete('/:id', urlParamsSchemeValidator(idSchema), deletePodcast)

router.put('/:id', urlParamsSchemeValidator(idSchema), requestSchemeValidator(updateSchema), updatePodcast)

module.exports = router
