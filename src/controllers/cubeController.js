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
    await cubeServices.create(cube)
    res.redirect('/')
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/details/:id', async (req, res) => {
  const cube = await cubeServices.getOne(req.params.id).lean()
  res.render('details', { cube })
})

router.get('/:cubeId/attach-accessory', (req, res) => {
  res.render('accessory/attach')
})

module.exports = router
