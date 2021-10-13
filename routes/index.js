const express = require('express')
const router = express.Router()
const { getPodcast, addPodcast, updatePodcast, deletePodcast } = require('../controllers/podcast')
const { idSchema, updateSchema, addSchema } = require('../schemas/podcast')
const { urlParamsSchemeValidator, requestSchemeValidator } = require('../middlewares/authenticationMiddlewares')

router.get('/podcast/:id', urlParamsSchemeValidator(idSchema), getPodcast)

router.post('/podcast/new', requestSchemeValidator(addSchema), addPodcast)

router.delete('/podcast/:id', deletePodcast)

router.put('/podcast/:id', requestSchemeValidator(updateSchema), updatePodcast)

module.exports = router
