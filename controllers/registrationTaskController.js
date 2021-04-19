const RegistrationTask = require('../models/registrationTaskModel')

exports.getRegistrationTasks = async function (req, res) {
  const response = await RegistrationTask.find({})

  res.json(response)
}
