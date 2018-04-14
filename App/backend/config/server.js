const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
//const allowCors = require('./cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
//server.use(allowCors)
server.use(queryParser())

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`)
})

var escdb = {
  host: "35.198.21.170",
  user: "sampleuser",
  password: "125678",
  database : "escdb"
};

module.exports = { server, escdb }
