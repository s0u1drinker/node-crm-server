const {Schema, model} = require('mongoose')

const positionSchema = new Schema({
  name: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('Position', positionSchema)
