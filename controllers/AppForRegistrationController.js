const AppOfRegistration = require('../models/appForRegistrationModel')
const Log = require('../models/logModel')

exports.addNewApplicationForRegistration = async function (req, res) {
  const appForReg = new AppOfRegistration({ app_date: new Date(), ...req.body })
  const log = new Log({
    user: '',
    date: new Date(),
    event: '5edf1e86abcdcc056c78b942',
    text: `Пользователь <${req.body.surname} ${req.body.name} ${req.body.patronymic}> создал заявку на регистрацию.`
  })

  appForReg.save()
  log.save()

  res.json(`${appForReg._id}.pdf`)
}
