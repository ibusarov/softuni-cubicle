const express = require('express')
const cookieParser = require('cookie-parser')
const { initializeDatabase } = require('./config/database')
const routes = require('./routes')

const PORT = 5000

const app = express()

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
require('./config/handlebars')(app)

app.use(routes)

initializeDatabase()
  .then(() => {
    app.listen(5000, () => console.log(`Server is listening on port ${PORT}`))
  })
  .catch((err) => {
    console.log('Cannot connect to db:', err)
  })
