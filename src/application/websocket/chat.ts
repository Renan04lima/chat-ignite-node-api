import { CreateUser } from '@/application/services/create.user'
import { ListUsers } from '@/application/services/list.users'
import { io } from '@/main/config'

type Request = {
  email: string
  avatar: string
  name: string
}

io.on('connect', socket => {
  socket.on('start', async (data: Request) => {
    const { email, avatar, name } = data

    const user = await new CreateUser().create({
      email,
      avatar,
      name,
      socket_id: socket.id
    })

    socket.broadcast.emit('new_users', user)
  })

  socket.on('get_users', async (cb) => {
    const users = await new ListUsers().list()
    cb(users)
  })
})
