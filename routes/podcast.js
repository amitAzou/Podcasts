const express = require('express')
const router = express.Router()
const {
  getPodcast,
  addPodcast,
  updatePodcast,
  deletePodcast,
  searchPodcast,
  getPodcastsByRating,
} = require('../controllers/podcast')
const {updateSchema, addSchema, idSchema} = require('../schemas/podcast')
const {
  urlParamsSchemeValidator,
  requestSchemeValidator,
} = require('../middlewares/validiationMiddlewares')
const {saveToS3} = require('../controllers/aws')

router.get('/:id', urlParamsSchemeValidator(idSchema), getPodcast)

router.post('/new', requestSchemeValidator(addSchema), addPodcast)

router.delete('/:id', urlParamsSchemeValidator(idSchema), deletePodcast)

router.put(
  '/:id',
  urlParamsSchemeValidator(idSchema),
  requestSchemeValidator(updateSchema),
  updatePodcast
)

router.get('/search/database/:query?', searchPodcast)

router.get('/rating/all', getPodcastsByRating)

router.post('/save/s3', saveToS3)

module.exports = router
