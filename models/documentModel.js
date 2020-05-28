const {Schema, model} = require('mongoose')

const documentSchema = new Schema({
  filename: {
    type: String
  },
  doc_owner: {
    type: Object
  },
  doc_number: {
    type: String
  },
  doc_type: {
    type: Object
  },
  doc_date: {
    type: String
  },
  doc_name: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('Documents', documentSchema)
