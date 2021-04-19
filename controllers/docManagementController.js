const DocManagement = require('../models/docManagementModel')

exports.getRegisters = async function (req, res) {
  const response = await DocManagement.find({}, {reg_num: 1, title: 1})

  res.json(response)
}

exports.getRegisterData = async function (req, res) {
  const response = await DocManagement.find({ _id: req.body.id})

  res.json(response)
}

exports.saveRegisterData = function (req, res) {
  const response = {
    flag: false,
    details: ''
  }

  DocManagement.updateOne({ _id: req.body.regId}, { $push: { list: req.body.regData } }, (err, result) => {
    if (err) {
      response.flag = true
      response.details = err
    }
  })

  res.json(response)
}
