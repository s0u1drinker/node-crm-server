const express = require('express')
const user_controller = require('./../controllers/userController')

const router = express.Router()

router.post('/', user_controller.auth)

module.exports = router
