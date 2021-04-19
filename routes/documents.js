const express = require('express')
const document_controller = require('./../controllers/documentController')

const router = express.Router()

router.get('/', document_controller.get)
router.get('/getDocumentsForMainPage', document_controller.getDocumentsForMainPage)
router.post('/getDocumentsByText', document_controller.getDocumentsByText)
router.post('/updateViewsCountOfDocument', document_controller.updateViewsCountOfDocument)

module.exports = router
