const User = require('../models/userModel')
const ActiveDirectory = require('activedirectory')

const config = require('./../config/ldap')
const ad = new ActiveDirectory(config.ldap)

exports.auth = function(req, res) {
  const login = req.body.name
  const pass = req.body.pass
  const response = {
    err: false,
    auth: false,
    descr: ''
  }

  new Promise ((resolve, reject) => {
    if(login && pass) {
      // Аутентификация в Active Directory
      ad.authenticate(`${login}@${config.domainName}.${config.domainNameExt}`, pass, function(err, auth) {
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
    req.session.user = {id: login}
    response.auth = true
  }).catch(err => {
    response.err = true
    response.descr = err
  }).finally(() => {
    res.json(response)
  })
}
