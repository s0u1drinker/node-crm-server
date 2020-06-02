const Document = require('../models/documentModel')
const DocumentOwner = require('../models/documentOwnerModel')
const DocumentType = require('../models/documentTypeModel')

exports.get = function (req, res) {
  res.json('I have not documents for you!')
}

exports.getDocumentsForMainPage = async function (req, res) {
  const response = {}

  response.vokkc = await Document.aggregate([
    {
      $match: {
        doc_owner: 'vokkc'
      }
    },
    {
      $lookup: {
        from: DocumentOwner.collection.name,
        localField: 'doc_owner',
        foreignField: '_id',
        as: 'owner'
      }
    },
    {
      $unwind: {
        path: '$owner'
      }
    },
    {
      $lookup: {
        from: DocumentType.collection.name,
        localField: 'doc_type',
        foreignField: '_id',
        as: 'doc_type'
      }
    },
    {
      $unwind: {
        path: '$doc_type'
      }
    }
  ]).sort({views: -1}).limit(5)

  response.kzvo = await Document.aggregate([
    {
      $match: {
        doc_owner: 'kzvo'
      }
    },
    {
      $lookup: {
        from: DocumentOwner.collection.name,
        localField: 'doc_owner',
        foreignField: '_id',
        as: 'owner'
      }
    },
    {
      $unwind: {
        path: '$owner'
      }
    },
    {
      $lookup: {
        from: DocumentType.collection.name,
        localField: 'doc_type',
        foreignField: '_id',
        as: 'doc_type'
      }
    },
    {
      $unwind: {
        path: '$doc_type'
      }
    }
  ]).sort({views: -1}).limit(5)

  response.other = await Document.aggregate([
    {
      $match: {
        doc_owner: { $nin:["vokkc", "kzvo"] }
      }
    },
    {
      $lookup: {
        from: DocumentOwner.collection.name,
        localField: 'doc_owner',
        foreignField: '_id',
        as: 'owner'
      }
    },
    {
      $unwind: {
        path: '$owner'
      }
    },
    {
      $lookup: {
        from: DocumentType.collection.name,
        localField: 'doc_type',
        foreignField: '_id',
        as: 'doc_type'
      }
    },
    {
      $unwind: {
        path: '$doc_type'
      }
    }
  ]).sort({views: -1}).limit(5)

  res.json(response)
}

exports.updateViewsCountOfDocument = async function (req, res) {
  await Document.updateOne({_id: req.body.id}, {$inc: {'views': 1}})
}
