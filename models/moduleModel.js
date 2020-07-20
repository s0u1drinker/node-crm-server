const {Schema, model} = require('mongoose')

const moduleSchema = new Schema({
  module_name: {
    type: String
  },
  title: {
    type: String
  },
  quick_access: {
    type: String
  },
  icon: {
    type: String
  },
  groups: {
    type: Array
  }
}, {
  versionKey: false
})

module.exports = model('Module', moduleSchema)
