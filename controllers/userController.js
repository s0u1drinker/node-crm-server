const ActiveDirectory = require('activedirectory')

const Log = require('../models/logModel')
const Module = require('../models/moduleModel')
const UserSettings = require('../models/userSettingsModel')

const config = require('./../config/ldap')

exports.login = function(req, res) {
  const response = {
    err: false,
    auth: false
  }
  
  let sAMAccountName = false

  if (!req.body.checkUser) {
    // Добавляем логин и пароль в конфиг
    config.ldap.bindDN = req.body.login + config.domainName
    config.ldap.bindCredentials = req.body.pass
    sAMAccountName = req.body.login
  } else {
    if (req.session.user) {
      sAMAccountName = req.session.user.id
    }
  }
  
  new Promise ((resolve, reject) => {
    if (sAMAccountName) {
      // Запускаем библиотеку для работы с AD
      const ad = new ActiveDirectory(config.ldap)

      if (!req.body.checkUser) {
        // Проверяем наличие логина и пароля
        if(config.ldap.bindDN && config.ldap.bindCredentials) {
          // Аутентификация в Active Directory
          ad.authenticate(config.ldap.bindDN, config.ldap.bindCredentials, function(err, auth) {
            if (!auth) {
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
      }

      ad.findUser(sAMAccountName, function(err, user) {
        if(err) {
          console.log(err)
          reject('Непредвиденная ошибка при поиске пользователя')
        }
        if(!user) {
          reject('Информация о пользователе не найдена')
        } else {
          // Забираем список групп пользователя
          ad.getGroupMembershipForUser(user.sAMAccountName, async function (err, groups) {
            if (err) {
              console.log(err)
              reject('Непредвиденная ошибка с поиском групп пользователя')
            }

            user.groups = (groups) ? groups.map((item) => { return item.cn }) : []

            // Вытаскиваем из БД список модулей для пользователя
            user.modules = await Module.find(
              {
                $or: [
                  {
                    groups: {
                      $in: user.groups
                    }
                  },
                  {
                    users: {
                      $in: user.sAMAccountName
                    }
                  }
                ]
              },
              {
                groups: 0,
                users: 0
              }
            )

            // Вытаскиваем из БД настройки пользователя
            user.settings = await UserSettings.findOne(
              {
                user: user.sAMAccountName
              },
              {
                _id: 0,
                user: 0
              }
            )

            resolve(user)
          })
        }
      })
    } else {
      res.json(response)
    }
  }).then(user => {
    if (!req.body.checkUser) {
      // Экземпляр логирования авторизации пользователя
      const log = new Log({
        user: user.sAMAccountName,
        date: new Date(),
        event: '5edf1e9cabcdcc056c78b943',
        text: `Пользователь <${user.displayName}> успешно авторизовался.`
      })

      // Добавляем в сессию информацию о пользователе
      req.session.user = {id: user.sAMAccountName, displayName: user.displayName}

      // Сохраняем лог
      log.save()
    }

    response.auth = true
    response.username = user.displayName
    response.modules = user.modules
    response.settings = user.settings
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

exports.user = function (req, res) {
  res.send('User page')
}
