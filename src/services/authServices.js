const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { saltRounds, secret } = require('../constants')

exports.register = async ({ username, password, repeatPassword }) => {
  //return form validaton message
  if (password !== repeatPassword) {
    return false
  }
  let hashedPassword = await bcrypt.hash(password, saltRounds)

  let createdUser = User.create({
    username,
    password: hashedPassword,
  })

  return createdUser
}

exports.login = async ({ username, password }) => {
  const user = await User.findOne({ username })

  if (!user) {
    //TODO: Add a message
    return
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return
  }

  const result = new Promise((resolve, reject) => {
    jwt.sign(
      { _id: user._id, username: user.username },
      secret,
      { expiresIn: '30d' },
      (err, token) => {
        if (err) {
          reject(err)
        }

        resolve(token)
      }
    )
  })

  return result
}
