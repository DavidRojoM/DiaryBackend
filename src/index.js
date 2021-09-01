const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
require('./database')

app.use(cors())
app.use('/api', require('./routes/index'))

app.listen(process.env.PORT)
console.log('server on port', 3000)
