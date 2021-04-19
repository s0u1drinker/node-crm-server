const Phonebook = require('../models/phonebookModel')
const Department = require('../models/departmentModel')

exports.get = async function(req, res) {
  const phonebook = await Department.aggregate([
    {
      $lookup: {
        from: Phonebook.collection.name,
        let: { order_item: "$_id" },
        pipeline: [
          { $match:
            { $expr:
              { $and:
                { $eq: ["$id_department", "$$order_item"] }
              }
            }
          },
          {
            $sort: { order: 1 }
          }
        ],
        as: "cabinets"
      }
    },
    { $sort: { order: 1 } }
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
