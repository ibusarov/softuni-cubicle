const router = require('express').Router()
const cubeServices = require('../services/cubeServices')
const accessoryService = require('../services/accessoryService')

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
  const cube = await cubeServices.getOneDetails(req.params.id).lean()
  // console.log(cube);
  res.render('details', { cube })
})

router.get('/:cubeId/attach-accessory', async (req, res) => {
  const cube = await cubeServices.getOne(req.params.cubeId).lean()
  const accessories = await accessoryService
    .getAllAvailable(cube.accessories)
    .lean()
  res.render('accessory/attach', { cube, accessories })
})

router.post('/:cubeId/attach-accessory', async (req, res) => {
  const accessoryId = req.body.accessory

  await cubeServices.attachAccessories(req.params.cubeId, accessoryId)

  res.redirect(`/cube/details/${req.params.cubeId}`)
})

module.exports = router
