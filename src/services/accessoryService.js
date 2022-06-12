const Accessory = require('../models/Accessory')

exports.getAll = () => Accessory.find()

exports.create = (accessoryData) => {
  return Accessory.create(accessoryData)
}
