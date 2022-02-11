import { Server } from 'socket.io'
import { server } from '@/main/config'

const io = new Server(server)

export { io }
