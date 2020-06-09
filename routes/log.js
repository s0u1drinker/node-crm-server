const express = require('express')
const log_controller = require('./../controllers/logController')

const router = express.Router()

router.get('/', log_controller.get)
router.post('/add', log_controller.add)

module.exports = router
