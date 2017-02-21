const express = require('express')
const stylus = require('stylus')
const nib = require('nib')

const app = express()

const compile = (str, path) => {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
//app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('index',
  { title : 'Home' }
  )
})

app.listen(3000)