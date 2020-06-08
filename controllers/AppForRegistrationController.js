const AppOfRegistration = require('../models/AppForRegistrationModel')

exports.addNewApplicationForRegistration = async function (req, res) {
  const appForReg = new AppOfRegistration({ app_date: new Date(), ...req.body })

  appForReg.save()

  res.json(`${appForReg._id}.pdf`)
}
