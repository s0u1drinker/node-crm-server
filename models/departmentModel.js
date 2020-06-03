const {Schema, model} = require('mongoose')

const phonebookSchema = new Schema({
  name: {
    type: String
  },
  order: {
    type: Number
  },
  abbr: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('Departments', phonebookSchema)
