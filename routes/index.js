const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('What do you need?')
})

module.exports = router
