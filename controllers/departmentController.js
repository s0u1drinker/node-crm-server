const Department = require('../models/departmentModel')
const Position = require('../models/positionModel')
const Task = require('../models/registrationTaskModel')

exports.getDataForRegistration = async function (req, res) {
  const response = await Department.aggregate([
    {
      $match: { regForm: "1" }
    },
    {
      $lookup: {
        from: Position.collection.name,
        let: { positions: "$positions" },
        pipeline: [
          { $match:
            { $expr:
              { $in: ["$_id", "$$positions"] }
            }
          },
          {
            $sort: { name: 1 }
          }
        ],
        as: "positions"
      }
    },
    {
      $unwind: "$positions"
    },
    {
      $lookup: {
        from: Task.collection.name,
        let: { tasks: "$positions.tasks" },
        pipeline: [
          { $match:
            { $expr:
              { $in: ["$_id", "$$tasks"] }
            }
          },
          {
            $sort: { task: 1 }
          }
        ],
        as: "positions.tasks"
      }
    },
    {
      $group: {
        _id: {
          id: "$_id",
          name: "$name"
        },
        positions: {
          $push: "$positions"
        }
      }
    },
    {
      $sort: { "_id.name": 1 }
    },
  ])

  res.json(response)
}
