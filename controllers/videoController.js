const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const videoModel = require('../models/videoModel')
const videoOwnerModel = require('../models/videoOwnerModel')

const limit = 6

// Возвращает информация о последних 6 видеороликах (всех или конкретного владельца])
exports.getLastVideos = async function (req, res) {
  const skip = req.body.skip
  const match = req.body.owner || { $ne: false }

  const response = await videoModel.aggregate([
    {
      $match: {
        "owner.folder": match
      }
    },
    {
      $unwind: "$videos"
    },
    {
      $sort: {
        "videos.date": -1
      }
    },
    {
      $skip: skip * limit
    },
    {
      $limit: limit
    },
    {
      $project: {
        _id: 0,
        owner: {
          folder: "$owner.folder",
          name: "$owner.name"
        },
        video: "$videos"
      }
    }
  ])

  res.json({
    videos: response,
    endFlag: response.length < limit
  })
}

// Возвращает список "владельцев" видео
exports.getOwners = async function (req, res) {
  const response = await videoOwnerModel.find({}, { _id: 0 })

  res.json(response)
}

// Возвращает информацию о конкретном "владельце" видео
exports.getVideoOwnerInfo = async function (req, res) {
  const response = await videoOwnerModel.find({ video_owner_id: req.body.owner })

  res.json(response)
}

// Возвращает информацию о видеоролике
exports.getVideoInfo = async function (req, res) {
  const response = await videoModel.aggregate([
    {
      $unwind: "$videos"
    },
    {
      $match: {
        "videos._id": ObjectId(req.body.video)
      }
    },
    {
      $project: {
        _id: 0,
        order: 0
      }
    }
  ])

  res.json(response)
}
