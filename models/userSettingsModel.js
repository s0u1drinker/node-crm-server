const {Schema, model} = require('mongoose')

const userSettingsSchema = new Schema({
  user: {
    type: String
  },
  quick_access: {
    type: Array
  }
}, {
  versionKey: false
})

module.exports = model('UserSettings', userSettingsSchema, 'user_settings')
