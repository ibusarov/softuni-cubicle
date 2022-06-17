const router = require('express').Router()
const authServices = require('../services/authServices')

router.get('/register', (req, res) => {
  res.render('auth/Register')
})
router.post('/register', async (req, res) => {
  let createdUser = await authServices.register(req.body)

  if (createdUser) {
    res.redirect('/auth/login')
  } else {
    res.redirect('404')
  }
})

router.get('/login', (req, res) => {
  res.render('auth/login')
})

module.exports = router
