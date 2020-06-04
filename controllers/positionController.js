const Positions = require('../models/positionModel')

exports.getPositions = async function (req, res) {
  const response = await Positions.find({}).sort({ name: 1 })

  res.json(response)
}
