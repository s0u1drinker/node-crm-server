const {Schema, model} = require('mongoose')

const videoProfileSchema = new Schema({
  profile_id: String,
  profile: String
}, {
  versionKey: false
})

module.exports = model('VideoProfile', videoProfileSchema, 'videos_profiles')
