const router = require('express').Router()
const authServices = require('../services/authServices')
const { sessionName } = require('../constants')

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

router.post('/login', async (req, res) => {
  const token = await authServices.login(req.body)

  if (!token) {
    return res.redirect('/404')
  }

  res.cookie(sessionName, token, { httpOnly: true })

  res.redirect('/')
})

router.get('/logout', (req, res) => {
  res.clearCookie(sessionName)
  res.redirect('/')
})

module.exports = router
