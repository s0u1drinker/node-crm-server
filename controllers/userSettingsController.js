const UserSettings = require('../models/userSettingsModel')

exports.getUserSettings = async function (req, res) {
  res.json(req.body.username)
}
