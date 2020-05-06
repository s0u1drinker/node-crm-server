const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const port = require('./config/config').port
const routes = require('./config/routes')

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())
app.use(routes)

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
  .then(db => console.log('[OK] DB is connected.'))
  .catch(err => console.error(err))

app.listen(port, () => {
  console.log(`[OK] Server listening ${port}...`)
})
