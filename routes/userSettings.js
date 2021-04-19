const express = require('express')
const user_settings_controller = require('./../controllers/userSettingsController')

const router = express.Router()

router.post('/getUserSettings', user_settings_controller.getUserSettings)

module.exports = router
