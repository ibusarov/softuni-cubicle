const Accessory = require('../models/Accessory')

exports.getAll = () => Accessory.find()

exports.getAllAvailable = (ids) => Accessory.find({ _id: { $nin: ids } })

exports.create = (accessoryData) => {
  return Accessory.create(accessoryData)
}
