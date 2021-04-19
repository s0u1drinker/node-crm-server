const {Schema, model, ObjectId} = require('mongoose')

const videoSchema = new Schema({
  order: Number,
  owner: {
    name: String,
    folder: String,
    site: String
  },
  videos: Array
}, {
  versionKey: false
})

module.exports = model('Videos', videoSchema)
