const express = require('express')
const advert_controller = require('./../controllers/advertController')

const router = express.Router()

router.get('/', advert_controller.getAdverts)

module.exports = router
