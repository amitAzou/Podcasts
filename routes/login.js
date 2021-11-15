const express = require('express')
const router = express.Router()
const { userSchema } = require('../schemas/login')
const { urlParamsSchemeValidator } = require('../middlewares/validiationMiddlewares')
const { authenticateController } = require('../controllers/authentication')

router.post('/:username/:password', urlParamsSchemeValidator(userSchema), authenticateController)

module.exports = router
