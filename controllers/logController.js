const Log = require('../models/logModel')
const LogEvent = require('../models/logEventModel')

exports.get = function (req, res) {
  res.json('I can`t show you my log!')
}

exports.add = async function (req, res) {
  const response = req.body

  res.json(response)
}

exports.addLogEvent = function (req, res) {
  res.json('Nope.')
}
