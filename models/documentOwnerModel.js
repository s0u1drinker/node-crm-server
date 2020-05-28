const {Schema, model} = require('mongoose')

const documentOwnerSchema = new Schema({
  name: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('DocumentOwner', documentOwnerSchema)
