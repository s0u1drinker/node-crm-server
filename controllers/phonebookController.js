const Phonebook = require('../models/phonebookModel')
const Department = require('../models/departmentModel')

exports.get = async function(req, res) {
  const phonebook = await Department.aggregate([
    {
      $lookup: {
        from: Phonebook.collection.name,
        localField: "_id",
        foreignField: "id_department",
        as: "cabinets"
      }
    }
  ]).exec()

  res.json(phonebook)
}

exports.add = function(req, res) {
  const phonebook = new Phonebook({
    cabinet_num: "1",
    id_department: 1,
    cabinet: "1",
    employees: ["1"],
    phone_outer: "1",
    phone_inner: "1"
  })

  phonebook.save()
}
