const {Schema, model} = require('mongoose')

const videoOwnerSchema = new Schema({
  video_owner_id: String,
  video_owner_name: String,
  description: String,
  site: String
}, {
  versionKey: false
})

module.exports = model('VideoOwner', videoOwnerSchema, 'videos_owners')
