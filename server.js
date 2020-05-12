const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Забираем необходимые данные из конфигурационного файла
const { port, db } = require('./config/settings')

// Подключаем маршруты
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

// Создаем объект приложения
const app = express()

// Middlewares
app.use(session({
  secret: 'There is only war...',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    url: db('localhost', 27017, 'crm')
  })
}))
app.use(morgan('combined'))
app.use(express.json())
app.use(cors())

// Описываем маршруты
app.use('/', indexRouter)
app.use('/user', userRouter)

// Подключаемся к БД
mongoose.connect(db('localhost', 27017, 'crm'), {useNewUrlParser: true, useUnifiedTopology: true})
  .then(db => console.log('[OK] Соединение с БД установлено.'))
  .catch(err => console.error(err))

// Просим сервер обратить свой взор на порт
app.listen(port, () => {
  console.log(`[OK] Сервер пробудился и обратил свой взор на порт ${port}.`)
})
