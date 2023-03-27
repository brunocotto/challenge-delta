const swaggerDocs = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('node:path')
const bodyParser = require('body-parser')
require('dotenv').config({ path: './.env' })
const mongoose = require('mongoose')
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

const app = express()

app.use(cors())

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// release access to static files
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// routes students
const studentRoute = require('../src/routes/studentRoute')
app.use('/students', studentRoute)

// router docs
const termsRoute = require('../src/routes/termsRoute')
app.use('/terms', termsRoute)

// conection MongoDB
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.pyywseu.mongodb.net/challenge-delta?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conexão com o MongoDB bem sucedida.')
  })
  .catch((err) => console.log(err))

app.listen(3333)
