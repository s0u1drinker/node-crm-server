const {Schema, model} = require('mongoose')

const documentTypeSchema = new Schema({
  type: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('DocumentType', documentTypeSchema, 'documents_types')
