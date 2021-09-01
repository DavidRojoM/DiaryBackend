const express = require('express')

require('dotenv').config()
const app = express()
require('./database')

app.listen(process.env.PORT)

console.log('server on port', 3000)
