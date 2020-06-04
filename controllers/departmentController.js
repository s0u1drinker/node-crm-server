const Departments = require('../models/departmentModel')

exports.getDepartmentsForRegistration = async function (req, res) {
  const response = await Departments.find({ regForm: "1" }, {name: true}).sort({ name: 1 })

  res.json(response)
}
