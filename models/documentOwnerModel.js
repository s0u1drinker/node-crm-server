const {Schema, model} = require('mongoose')

const documentOwnerSchema = new Schema({
  fullname: {
    type: String
  },
  attr: {
    type: String
  },
  declension: {
    type: String
  },
  translit_owner_declension: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('DocumentOwner', documentOwnerSchema, 'documents_owners')
