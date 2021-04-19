const express = require('express')
const module_controller = require('./../controllers/moduleController')

const router = express.Router()

router.post('/getUserModules', module_controller.getUserModules)

module.exports = router
