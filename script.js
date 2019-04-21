var express = require('express')
var mustacheExpress = require('mustache-express')
var bodyParser = require('body-parser')
const {
  Client
} = require('pg')

var port = process.env.PORT || 8000

var client = new Client()

client.connect()

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', __dirname)


app.get('/', function(req, res) {
  res.render('index')
})

app.post('/post', function(req, res) {

  res.send()
  res.end()
})



app.listen(8000, function() {
  console.log("Web Server Started at port 8000")
})