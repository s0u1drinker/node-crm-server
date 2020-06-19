const {Schema, model} = require('mongoose')

const registrationTaskSchema = new Schema({
  task: {
    type: String
  },
  rationale: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = model('RegistrationTask', registrationTaskSchema, 'registration_tasks_list')
