const {Schema, model} = require('mongoose')

const videoTypeSchema = new Schema({
  type_folder_name: String,
  type_title: String
}, {
  versionKey: false
})

module.exports = model('VideoType', videoTypeSchema, 'videos_types')
