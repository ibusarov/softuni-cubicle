const Accessory = require('../models/Accessory')


exports.create = (accessoryData) => {
    return Accessory.create(accessoryData)
}