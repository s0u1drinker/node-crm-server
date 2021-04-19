const AppOfRegistration = require('../models/appForRegistrationModel')

exports.addNewApplicationForRegistration = async function (req, res) {
  const appForReg = new AppOfRegistration({ app_date: new Date(), ...req.body })

  appForReg.save()

  res.send(true)
}
