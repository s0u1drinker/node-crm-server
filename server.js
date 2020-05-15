const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Забираем необходимые данные из конфигурационного файла
const settings = require('./config/settings')

// Подключаем маршруты
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

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

// Подключаемся к БД
mongoose.connect(settings.db('localhost', 27017, 'crm'), {useNewUrlParser: true, useUnifiedTopology: true})
  .then(db => console.log('[OK] Соединение с БД установлено.'))
  .catch(err => console.error(err))

// Просим сервер обратить свой взор на порт
app.listen(settings.port, () => {
  console.log(`[OK] Дух машины пробудился и обратил свой взор на порт ${settings.port}.`)
})
