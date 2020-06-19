const {Schema, model} = require('mongoose')

const departmentSchema = new Schema({
  name: String,
  order: Number,
  abbr: String,
  regForm: String,
  head: {
    position: String,
    name: String
  },
  positions: Array
}, {
  versionKey: false
})

module.exports = model('Departments', departmentSchema)
