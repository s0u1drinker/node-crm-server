const {Schema, model, ObjectId} = require('mongoose')

const logSchema = new Schema({
  user: String,
  date: Date,
  event: ObjectId,
  text: String
}, {
  versionKey: false
})

module.exports = model('Log', logSchema, 'log')
