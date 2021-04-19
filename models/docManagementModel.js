const {Schema, model} = require('mongoose')

const docManagementSchema = new Schema({
  reg_num: String,
  title: String,
  types: [{
    num: String,
    title: String
  }],
  head: [{
    id: String,
    title: String,
    show: Boolean
  }],
  list: Array
}, {
  versionKey: false
})

module.exports = model('DocManagement', docManagementSchema, 'doc_management')
