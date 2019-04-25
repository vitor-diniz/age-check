const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

var age = null

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const isMajor = age => {
  if (age >= 18) {
    return true
  }
  return false
}

const gotAge = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  }
  next()
}

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  age = req.body.age

  if (isMajor(age)) {
    return res.redirect(`major/?age=${age}`)
  }
  return res.redirect(`minor/?age=${age}`)
})

app.get('/major', gotAge, (req, res) => {
  age = req.query.age
  console.log(req.query + ' ' + age)
  return res.render('major', { age })
  // return res.send(`Você é maior de idade e possui ${req.query.age} anos`);
})

app.get('/minor', gotAge, (req, res) => {
  age = req.query.age
  return res.render('minor', { age })
  // return res.send(`Você é menor de idade e possui ${req.query.age} anos`);
})

app.listen(3000)
