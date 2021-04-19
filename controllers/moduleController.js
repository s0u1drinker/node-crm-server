const Module = require('../models/moduleModel')

exports.getUserModules = function (req, res) {
  const groups = req.body.groups

  res.json(groups)
}
