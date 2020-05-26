const {Schema, model} = require('mongoose')

const eventSchema = new Schema({
  eventDate: {
    type: Date
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  place: {
    type: String
  },
  type: {
    type: String
  },
  icon: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('Events', eventSchema)
