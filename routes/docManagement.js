const express = require('express')
const dm_controller = require('./../controllers/docManagementController')

const router = express.Router()

router.get('/getRegisters', dm_controller.getRegisters)
router.post('/getRegisterData', dm_controller.getRegisterData)
router.post('/saveRegisterData', dm_controller.saveRegisterData)

module.exports = router
