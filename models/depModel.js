const {Schema, model} = require('mongoose')

const depSchema = new Schema({
  group_name: String,
  departments: [{
    id: String,
    name: String,
    abbr: String,
    reg_form: String,
    cabinets: [{
      cabinet_num: String,
      cabinet_name: String,
      Phone_outer: String,
      phone_inner: String,
      workspaces: [{
        user: String,
        position: String,
        is_head: Boolean,
        equipment: [{
          inventory_number: String,
          type: String,
          model: String,
          decription: String
        }]
      }]
    }],
    positions: Array,
    order: Number
  }]
}, {
  versionKey: false
})

module.exports = model('Deps', depSchema)
