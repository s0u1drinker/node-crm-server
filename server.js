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
// Статические файлы
app.use('/files', express.static(__dirname + '/files'));

// Подключаемся к БД
mongoose.connect(settings.db('localhost', 27017, 'crm'), {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('[OK] Соединение с БД установлено.'))
  .catch(err => console.log(`[ERROR] БД недоступна: ${err.message}. Вызывайте техножрецов!`))

// Проверка доступности LDAP
ad.userExists(configLDAP.testUser(), (err) => {
  console.log((err.code === 'ETIMEDOUT') ? '[ERROR] Сервер LDAP недоступен. Вызывайте техножрецов!' : '[ОК] Сервер LDAP доступен.')
})

// Пробуждаем сервер
app.listen(settings.port, () => {
  console.log(`[OK] Дух машины пробудился и обратил свой взор на порт ${settings.port}.`)
})
