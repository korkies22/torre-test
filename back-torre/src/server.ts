import './util/envs'
import express from 'express'
import cors from 'cors'
require('cross-fetch/polyfill')
import bodyParser from 'body-parser'
import { initDB } from './util/mongoose'
import { initSocket } from '@util/socket-io'
import { router } from './routes'
import http from 'http'
import { exceptionMiddleware } from './util/exceptionMiddleware'
import path from 'path'

const app = express()
// Import and Set Nuxt.js options
app.use(cors())

app.use(bodyParser.json())

const httpServer = http.createServer(app)
initSocket(httpServer)

app.use('/api', router)
app.use(express.static('public'))

app.use(function (req, res, next) {
  res.status(404)
  // respond with html page
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname + '/../public', 'index.html'))
    return
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' })
    return
  }
  // default to plain-text. send()
  res.type('txt').send('Not found')
})

router.use(exceptionMiddleware)

const PORT = process.env.PORT || 4000
initDB()

httpServer.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
