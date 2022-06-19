const router = require('express').Router()
const cubeServices = require('../services/cubeServices')
const accessoryService = require('../services/accessoryService')
const { isAuth } = require('../middlewares/authMiddleware')

router.get('/create', isAuth, (req, res) => {
  res.render('create')
})

router.post('/create', isAuth, async (req, res) => {
  const cube = req.body
  cube.owner = req.user._id

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
  const isOwner = cube.owner == req.user?._id

  res.render('details', { cube, isOwner })
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

router.get('/:cubeId/edit', isAuth, async (req, res) => {
  const cube = await cubeServices.getOne(req.params.cubeId).lean()

  //console.log(req.user) NB

  if (cube.owner != req.user._id) {
    return res.redirect('/404')
  }

  cube[`difficultyLevel${cube.difficultyLevel}`] = true

  if (!cube) {
    return res.redirect('/404')
  }

  res.render('cube/edit', { cube })
})

router.post('/:cubeId/edit', async (req, res) => {
  let modifiedCube = await cubeServices.edit(req.params.cubeId, req.body)

  res.redirect(`/cube/details/${modifiedCube._id}`)
})

router.get('/:cubeId/delete', async (req, res) => {
  const cube = await cubeServices.getOne(req.params.cubeId).lean()
  //TODO: is owner validation
  res.render('cube/delete', { cube })
})

router.post('/:cubeId/delete', async (req, res) => {
  await cubeServices.delete(req.params.cubeId)

  res.redirect('/')
})

module.exports = router
