const express = require('express')
const video_controller = require('./../controllers/videoController')

const router = express.Router()

router.post('/getLastVideos', video_controller.getLastVideos)
router.post('/getOwners', video_controller.getOwners)
router.post('/getVideoOwnerInfo', video_controller.getVideoOwnerInfo)
router.post('/getVideoInfo', video_controller.getVideoInfo)

module.exports = router
