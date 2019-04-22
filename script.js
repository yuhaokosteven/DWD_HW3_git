var express = require('express')
var mustacheExpress = require('mustache-express')
var bodyParser = require('body-parser')
const {
  Client
} = require('pg')

var port = process.env.PORT || 8000

// const {
//   DATABASE_URL
// } = process.env

var client = new Client({
  connectionString: process.env.HEROKU_POSTGRESQL_PURPLE_URL || process.env.DATABASE_URL,
  ssl: !!process.env.HEROKU_POSTGRESQL_PURPLE_URL
})

client.connect()
// .then(() => console.log('connect'))
// .catch(e => console.error('connection error', err.stack))


var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', __dirname)


// app.get('/all', function(req, res) {
//   client.query(`SELECT * FROM posts`, (err, result) => {
//     res.json(result)
//     res.end()
//   })
// })

app.get('/', function(req, res) {
  res.render('index')
})

app.post('/post', function(req, res) {

  const title = req.body.title
  const intro = req.body.content


  // var sql = "INSERT INTO customers (Title, Introduction) VALUES" + "(" + title + "," + intro + ")"
  // client.query(sql, (err, result) => {
  //   if (err) throw err
  //   console.log(ressult)
  client.query(`SELECT * FROM posts`, (err, result) => {
    console.log(result)
    res.send('Your data is saved!')
    res.end()
  })
  // })
})



app.listen(port, function() {
  console.log("Web Server Started at port 8000")
})