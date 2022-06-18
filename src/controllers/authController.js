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

router.post('/login', async (req, res) => {
  const token = await authServices.login(req.body)
  //console.log(token)
  if (!token) {
    return res.redirect('404')
  }

  res.cookie('session', token)
  
  res.redirect('/')
})

module.exports = router
