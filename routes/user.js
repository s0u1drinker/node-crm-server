const express = require('express')
const user_controller = require('./../controllers/userController')

const router = express.Router()

router.post('/', user_controller.user)
router.post('/login', user_controller.login)
router.post('/logout', user_controller.logout)

module.exports = router
