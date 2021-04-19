const Log = require('../models/logModel')
const LogEvent = require('../models/logEventModel')

exports.get = function (req, res) {
  res.json('I can`t show you my log!')
}

exports.addLog = async function (req, res) {
  const log = new Log({
    user: '',
    date: new Date(),
    event: '5edf1e86abcdcc056c78b942',
    text: `Пользователь: ${req.body.surname} ${req.body.name} ${req.body.patronymic}, отделение: ${req.body.department}, должность: ${req.body.position}, задачи: ${req.body.tasks}`
  })

  log.save()

  res.send(true)
}

exports.addLogEvent = function (req, res) {
  res.json('Nope.')
}
