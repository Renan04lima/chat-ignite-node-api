import './config/module.alias'
import { app } from '@/main/config/app'
import { createServer } from 'http'
import { Server } from 'socket.io'

const server = createServer(app)

app.get('/', (req, res) => {
  res.json({ message: 'api works!' })
})

const io = new Server(server)
io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3333, () => console.log('running on port 3333'))
