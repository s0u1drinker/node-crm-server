const {Schema, model} = require('mongoose')

const phonebookSchema = new Schema({
  name: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('Departments', phonebookSchema)
