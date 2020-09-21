const express = require('express')
const dep_controller = require('./../controllers/depController')

const router = express.Router()

router.get('/getListDepartments', dep_controller.getListDepartments)
router.post('/getDepartmentCabinets', dep_controller.getDepartmentCabinets)

module.exports = router
