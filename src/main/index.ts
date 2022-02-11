import './config/module.alias'
import { server, io } from '@/main/config'
import '@/application/websocket/chat'
import mongoose from 'mongoose'

main().catch(err => console.log('mongodb error', err))

async function main (): Promise<void> {
  await mongoose.connect('mongodb://localhost:27017/test')
}
io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3333, () => console.log('running on port 3333'))
