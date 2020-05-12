const ActiveDirectory = require('activedirectory')

exports.auth = function(req, res) {
  const config = require('./../config/ldap')
  const response = {
    err: false,
    auth: false
  }

  // Добавляем логин и пароль в конфиг
  config.ldap.sAMAccountName = req.body.login
  config.ldap.bindDN = req.body.login + config.domainName
  config.ldap.bindCredentials = req.body.pass

  // Запускаем библиотеку для работы с AD
  const ad = new ActiveDirectory(config.ldap)
  
  // Promise с аутентификацией
  new Promise ((resolve, reject) => {
    if(config.ldap.bindDN && config.ldap.bindCredentials) {
      // Аутентификация в Active Directory
      ad.authenticate(config.ldap.bindDN, config.ldap.bindCredentials, function(err, auth) {
        if(auth){
          // Поиск информации о пользователе в AD
          ad.findUser(config.ldap.sAMAccountName, function(err, user) {
            if(err) {
              reject('Непредвиденная ошибка')
            }
            if(!user) {
              reject('Информация о пользователе не найдена')
            } else {
              resolve(user)
            }
          })
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
  }).then(user => {
    req.session.user = {id: user.sAMAccountName}
    response.auth = true
    response.username = user.displayName
  }).catch(err => {
    response.err = true
    response.descr = err
  }).finally(() => {
    res.json(response)
  })
}

exports.logout = function (req, res) {
  delete req.session.user
  // TODO:
  // 1. Remove session from DB;
  // 2. Clear cookie.
}

exports.user = function (req, res) {
  res.send('User page')
}
