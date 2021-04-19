const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Do not touch me!')
})

module.exports = router
