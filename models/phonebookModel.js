const {Schema, model} = require('mongoose')

const phonebookSchema = new Schema({
  cabinet_num: {
    type: String
  },
  id_department: {
    type: Number,
    required: true
  },
  cabinet_name: {
    type: String
  },
  employees: {
    type: Array
  },
  phone_outer: {
    type: String
  },
  phone_inner: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('Phones', phonebookSchema)
