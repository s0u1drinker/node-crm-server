const Event = require('../models/eventModel')

exports.get = function (req, res) {
  res.json('No events to show!')
}

exports.getEventsForDate = async function (req, res) {
  const eventsDate = new Date(req.body.eventDate)
  const response = await Event.find({
    eventDate: {
      $gte: new Date(eventsDate.getFullYear(), eventsDate.getMonth(), eventsDate.getDate(), 0, 0),
      $lt: new Date(eventsDate.getFullYear(), eventsDate.getMonth(), eventsDate.getDate(), 23, 59)
    }
  }).sort({ eventDate: 1 })

  res.json(response)
}
