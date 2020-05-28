const {Schema, model} = require('mongoose')

const documentTypeSchema = new Schema({
  name: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('DocumentType', documentTypeSchema)
