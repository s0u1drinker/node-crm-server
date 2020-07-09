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

exports.getDocumentsByText = async function (req, res) {
  const limit = (req.body.limit) ? req.body.limit : 5
  const skip = (req.body.skip) ? req.body.skip * limit : 0
  const text = req.body.text.split(' ').join('|')
  const regExp = new RegExp(`${text}`, 'i')
  const documents = {
    count: 0,
    data: []
  }

  documents.data = await Document.aggregate([
    {
      $lookup: {
        from: DocumentOwner.collection.name,
        localField: 'doc_owner',
        foreignField: '_id',
        as: 'owner'
      }
    },
    {
      $unwind: "$owner"
    },
    {
      $lookup: {
        from: DocumentType.collection.name,
        localField: 'doc_type',
        foreignField: '_id',
        as: 'type'
      }
    },
    {
      $unwind: "$type"
    },
    {
      $project: {
        "_id": 0,
        filename: "$filename",
        owner: "$owner",
        type: "$type.type",
        doc_number: "$doc_number",
        doc_date: "$doc_date",
        doc_name: "$doc_name",
        search_string: {
          $concat: ["$type.type", " ", "$owner.fullname", " ", "$owner.abbr", " ", "$doc_number", " ", "$doc_date", " ", "$doc_name"]
        }
      }
    },
    {
      $match: {
        search_string: regExp
      }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    }
  ])

  documents.count = documents.data.length

  res.json(documents)
}

exports.updateViewsCountOfDocument = async function (req, res) {
  await Document.updateOne({_id: req.body.id}, {$inc: {'views': 1}})
}
