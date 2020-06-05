const express = require('express')
const department_controller = require('./../controllers/departmentController')
const position_controller = require('./../controllers/positionController')
const reg_tasks_controller = require('./../controllers/registrationTaskController')

const router = express.Router()

router.get('/getDepartmentsForRegistration', department_controller.getDepartmentsForRegistration)
router.get('/getPositions', position_controller.getPositions)
router.get('/getRegistrationTasks', reg_tasks_controller.getRegistrationTasks)

module.exports = router
