const express = require('express')
const handlebars = require('express-handlebars')

const PORT = 5000

const app = express()

app.use('/static',express.static('public'))

app.engine(
  'hbs',
  handlebars.engine({
    extname: 'hbs',
  })
)
app.set('view engine', 'hbs')
app.set('views', './src/views')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, console.log(`Server is running on port ${PORT}`))
