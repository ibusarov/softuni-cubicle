const express = require('express')

const homeController = require('./controllers/homeController')

const router = express.Router()

const cubeController = require('./controllers/cubeController')

router.get('/', homeController.index)
router.get('/about', homeController.about)
router.use('/cube', cubeController)

module.exports = router
