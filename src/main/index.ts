import './config/module.alias'
import { server, io } from '@/main/config'

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3333, () => console.log('running on port 3333'))
