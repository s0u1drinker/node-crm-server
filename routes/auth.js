const express = require('express')
const ActiveDirectory = require('activedirectory')

const router = express.Router()
const config = require('./../config/ldap')
const ad = new ActiveDirectory(config.ldap)

router.post('/', (req, res) => {
  const username = req.body.name
  const userpass = req.body.pass
  const response = {
    err: false,
    auth: false,
    descr: ''
  }

  new Promise ((resolve, reject) => {
    if(username && userpass) {
      // Аутентификация в Active Directory
      ad.authenticate(`${username}@${config.domainName}.${config.domainNameExt}`, userpass, function(err, auth) {
        if(auth){
          resolve(true)
        } else {
          // Сообщение об ошибке
          let errMessage = err.lde_message
          let errCode = ''
          let errText = ''

          // "Вытаскиваем" код ошибки
          errCode = errMessage.slice(errMessage.indexOf('data')).split(',')[0].split(' ')[1]
          
          // Расшифровываем наиболее распространенные коды ошибок.
          // Подробно об ошибках авторизации в LDAP можно почитать тут:
          // https://docs.servicenow.com/bundle/jakarta-platform-administration/page/administer/reference-pages/reference/r_LDAPErrorCodes.html?title=LDAP_Error_Codes#gsc.tab=0
          switch (errCode) {
            case '52e':
              errText = 'Логин или пароль указаны неверно'
              break
            case '532':
              errText = 'Срок действия пароля истек'
              break
            case '533':
              errText = 'Учетная запись заблокирована'
              break
            case '773':
              errText = 'Необходимо сменить пароль'
              break
            default:
              errText = 'Непредвиденная ошибка'
              break
          }

          reject(errText)
        }
      })
    } else {
      reject('Не указан логин или пароль')
    }
  }).then(result => {
    response.auth = true
  }).catch(err => {
    response.err = true
    response.descr = err
  }).finally(() => {
    res.json(response)
  })
})

module.exports = router
