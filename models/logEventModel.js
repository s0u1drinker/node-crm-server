const {Schema, model} = require('mongoose')

const logEventSchema = new Schema({
  event_name: String,
}, {
  versionKey: false
})

module.exports = model('LogEvent', logEventSchema, 'log_events')
