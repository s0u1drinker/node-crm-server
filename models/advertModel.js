const {Schema, model} = require('mongoose')

const advertSchema = new Schema({
  type: {
    type: String
  },
  header: {
    type: String
  },
  text: {
    type: String
  },
  order: {
    type: Number
  }
}, {
  versionKey: false
})

module.exports = model('Adverts', advertSchema)
