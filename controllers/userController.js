const ActiveDirectory = require('activedirectory')
const Log = require('../models/logModel')
const config = require('./../config/ldap')

exports.auth = function(req, res) {
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
    const log = new Log({
      user: user.sAMAccountName,
      date: new Date(),
      event: '5edf1e9cabcdcc056c78b943',
      text: `Пользователь <${user.displayName}> успешно авторизовался.`
    })

    req.session.user = {id: user.sAMAccountName, displayName: user.displayName}
    response.auth = true
    response.username = user.displayName
    log.save()
  }).catch(err => {
    response.err = true
    response.descr = err
  }).finally(() => {
    res.json(response)
  })
}

exports.logout = function (req, res) {
  const response = {
    err: false
  }
  const log = new Log({
    user: req.session.user.id,
    date: new Date(),
    event: '5edf1eb6abcdcc056c78b944',
    text: `Пользователь <${req.session.user.displayName}> вышел из системы.`
  })

  req.session.destroy((err) => {
    response.err = true
    response.descr = err
  })
  res.clearCookie('crm-sid')
  log.save()
  res.send(response)
}

exports.check = function(req, res) {
  const response = {
    err: false
  }

  if(req.session.user) {
    const ad = new ActiveDirectory(config.ldap)

    new Promise((resolve, reject) => {
      ad.findUser(req.session.user.id, function(err, user) {
        if(err) {
          reject(err)
        }
        if(!user) {
          reject('Информация о пользователе не найдена')
        } else {
          resolve(user)
        }
      })
    }).then(user => {
      response.auth = true
      response.username = user.displayName
    }).catch(err => {
      response.err = true
      response.descr = err
    }).finally(() => {
      res.json(response)
    })
  } else {
    response.auth = false
    res.json(response)
  }
}

exports.user = function (req, res) {
  res.send('User page')
}
