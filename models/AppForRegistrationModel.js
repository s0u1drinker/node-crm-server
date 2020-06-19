const {Schema, model, ObjectId } = require('mongoose')

const appForRegistrationSchema = new Schema({
  app_date: {
    type: Date
  },
  surname: {
    type: String
  },
  name: {
    type: String
  },
  patronymic: {
    type: String
  },
  department: {
    type: ObjectId
  },
  position: {
    type: ObjectId
  },
  tasks: {
    type: [ObjectId]
  }
}, {
  versionKey: false
})

module.exports = model('AppForRegistration', appForRegistrationSchema, 'application_for_registration')
