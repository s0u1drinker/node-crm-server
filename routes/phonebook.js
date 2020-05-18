const express = require('express')
const phonebook_controller = require('./../controllers/phonebookController')

const router = express.Router()

router.get('/', phonebook_controller.get)
router.post('/add', phonebook_controller.add)

module.exports = router
