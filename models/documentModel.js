const {Schema, model} = require('mongoose')

const documentSchema = new Schema({
  filename: {
    type: String
  },
  doc_owner: {
    type: String
  },
  doc_number: {
    type: String
  },
  doc_type: {
    type: String
  },
  doc_date: {
    type: String
  },
  doc_name: {
    type: String
  },
  views: {
    type: Number
  }
}, {
  versionKey: false
})

module.exports = model('Document', documentSchema)
