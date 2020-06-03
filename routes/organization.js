const express = require('express')
const department_controller = require('./../controllers/departmentController')
const position_controller = require('./../controllers/positionController')

const router = express.Router()

router.get('/getDepartments', department_controller.getDepartments)
router.get('/getPositions', position_controller.getPositions)

module.exports = router
