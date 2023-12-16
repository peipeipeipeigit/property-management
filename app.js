const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

const db = require('./models')
const Todo = db.Todo
const User = db.User

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// login
app.get('/users/login', (req, res) => {
  res.render('login')
})
app.post('/users/login', (req, res) => {
  res.send('login')
})

// register
app.get('/users/register', (req, res) => {
  res.render('register')
})
app.post('/users/register', (req, res) => {
  const { name, email, password, confirmingPassword } = req.body
  User.create({ name, email, password })
    .then(user => res.redirect('/'))
})

// logout
app.get('/users/logout', (req, res) => {
  res.send('logout lo ^_^')
})

// homepage
app.get('/', (req, res) => {
  res.send('hello world')
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})