const express = require('express')
const department_controller = require('./../controllers/departmentController')
const position_controller = require('./../controllers/positionController')
const reg_tasks_controller = require('./../controllers/registrationTaskController')
const app_for_reg_controller = require('./../controllers/AppForRegistrationController')

const router = express.Router()

router.get('/getDepartmentsForRegistration', department_controller.getDepartmentsForRegistration)
router.get('/getPositions', position_controller.getPositions)
router.get('/getRegistrationTasks', reg_tasks_controller.getRegistrationTasks)
router.post('/addNewApplicationForRegistration', app_for_reg_controller.addNewApplicationForRegistration)

module.exports = router
