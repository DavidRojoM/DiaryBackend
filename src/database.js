const mongoose = require('mongoose')
require('dotenv').config()

mongoose
  .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/diary-auth`)
  .then((db) => console.log('db is connected'))
  .catch((err) => console.error(err))
