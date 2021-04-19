const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const ActiveDirectory = require('activedirectory')

// Забираем необходимые данные из конфигурационного файла
const settings = require('./config/settings')
const configLDAP = require('./config/ldap')

// Инициализируем подключение к Active Directory
const ad = new ActiveDirectory(configLDAP.ldap)

// Подключаем маршруты
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const phonebookRouter = require('./routes/phonebook')
const eventRouter = require('./routes/events')
const advertRouter = require('./routes/adverts')
const documentRouter = require('./routes/documents')
const organizationRouter = require('./routes/organization')
const logRouter = require('./routes/log')
const moduleRouter = require('./routes/modules')
const videoRouter = require('./routes/video')
const depRouter = require('./routes/deps')
const DocManagementRouter = require('./routes/docManagement')

// Создаем объект приложения
const app = express()

// Middlewares
app.use(session({
  secret: settings.session.secret,
  key: settings.session.key,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax'
  },
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))
app.use(morgan('combined'))
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}))

// Описываем маршруты
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/phonebook', phonebookRouter)
app.use('/events', eventRouter)
app.use('/adverts', advertRouter)
app.use('/documents', documentRouter)
app.use('/organization', organizationRouter)
app.use('/log', logRouter)
app.use('/modules', moduleRouter)
app.use('/videos', videoRouter)
app.use('/deps', depRouter)
app.use('/doc-management', DocManagementRouter)
// Статические файлы
app.use('/files', express.static(__dirname + '/files'));

// Подключаемся к БД
mongoose.connect(settings.db('localhost', 27017, 'crm'), {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('\x1b[32m[OK]\x1b[0m Соединение с БД установлено.'))
  .catch(err => console.log(`\x1b[31m[ERROR]\x1b[0m БД недоступна: ${err.message}. Вызывайте техножрецов!`))

// Проверка доступности LDAP
ad.userExists(configLDAP.testUser(), (err) => {
  console.log((err.code === 'ETIMEDOUT') ? '\x1b[31m[ERROR]\x1b[0m Сервер LDAP недоступен. Вызывайте техножрецов!' : '\x1b[32m[OK]\x1b[0m Сервер LDAP доступен.')
})

// Пробуждаем сервер
app.listen(settings.port, () => {
  console.log(`\x1b[32m[OK]\x1b[0m Дух машины пробудился и обратил свой взор на порт ${settings.port}.`)
})
