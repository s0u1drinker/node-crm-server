const express = require('express')
const event_controller = require('./../controllers/eventController')

const router = express.Router()

router.get('/', event_controller.get)
router.post('/forDate', event_controller.getEventsForDate)

module.exports = router
