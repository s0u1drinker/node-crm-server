const express = require('express')
const user_controller = require('./../controllers/userController')

const router = express.Router()

router.post('/', user_controller.user)
router.post('/auth', user_controller.auth)
router.post('/check', user_controller.check)
router.post('/logout', user_controller.logout)

module.exports = router
