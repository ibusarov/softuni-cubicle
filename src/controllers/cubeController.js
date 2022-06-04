const router = require('express').Router()
const cubeServices = require('../services/cubeServices')

router.get('/create', (req, res) => {
  res.render('create')
})

router.post('/create', async (req, res) => {
  const cube = req.body

  //Validate
  if (cube.name.length < 2) {
    res.status(400).send('Invalid request')
    return
  }

  //Save data
  try {
    await cubeServices.save(cube)
    res.redirect('/')
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
