const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
require('./database')

app.use(express.json())
app.use(express.urlencoded())

app.use(cors())
app.use(morgan('dev'))
app.use('/api', require('./routes/index'))

app.set('PORT', process.env.PORT || 3000)

app.listen(app.get('PORT'))
console.log('server on port', app.get('PORT'))
