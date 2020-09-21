const Dep = require('../models/depModel')

exports.getListDepartments = async function (req, res) {
  const response = await Dep.aggregate([
    {
      $project: {
        _id: 1,
        group_name: 1,
        values: "$departments"
      }
    },
    {
      $project: {
        "values.cabinets": 0,
        "values.abbr": 0,
        "values.reg_form": 0,
        "values.order": 0,
        "values.positions": 0
      }
    }
  ])

  res.json(response)
}

exports.getDepartmentCabinets = async function (req, res) {
  const response = await Dep.aggregate([
    {
      $unwind: "$departments"
    },
    {
      $match: {
        "departments.id": req.body.id
      }
    },
    {
      $project: {
        _id: 0,
        cabinet: "$departments.cabinets"
      }
    },
    {
      $unwind: "$cabinet"
    },
    {
      $unwind: "$cabinet.workspaces"
    },
    {
      $unwind: "$cabinet.workspaces.equipment"
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [ "$cabinet", "$$ROOT" ]
        }
      }
    },
    {
      $project: {
        "cabinet": 0
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [ "$workspaces", "$$ROOT" ]
        }
      }
    },
    {
      $project: {
        "workspaces": 0
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [ "$equipment", "$$ROOT" ]
        }
      }
    },
    {
      $project: {
        "equipment": 0
      }
    }
  ])

  res.json(response)
}
