const express = require('express')
const ActiveDirectory = require('activedirectory')

const router = express.Router()
const config = require('./config')
const configLDAP = config.ldap
const ad = new ActiveDirectory(configLDAP)

router.get('/', (req, res) => {
  res.send('What do you need?')
})

router.post('/auth', express.json(), (req, res) => {
  const username = req.body.name
  const userpass = req.body.pass
  const response = {
    err: false,
    auth: false,
    descr: ''
  }

  if(username && userpass) {
    ad.authenticate(`${username}@${config.domainName}.${config.domainNameExt}`, userpass, function(err, auth) {
      if(auth){
        response.auth = true
      } else {
        response.err = true
        response.descr = 'Логин или пароль указаны неверно!'
        // console.log(JSON.stringify(err))
      }
    })
  } else {
    response.err = true
    response.descr = 'Не указан логин или пароль!'
  }

  res.send(response)
})

module.exports = router
