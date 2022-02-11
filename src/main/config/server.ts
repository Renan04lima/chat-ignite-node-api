import express from 'express'
import { join } from 'path'
import { createServer } from 'http'

const app = express()

app.use(express.static(join(__dirname, '..', '..', '..', 'public')))
app.use(express.json())
app.get('/', (req, res) => {
  res.json({ message: 'api works!' })
})

const server = createServer(app)

export { server }
