const Event = require('../models/advertModel')

exports.getAdverts = async function (req, res) {
  const response = await Event.find({}).sort({ order: 1 })

  res.json(response)
}
