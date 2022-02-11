import { CreateChatRoom, CreateUser, GetChatRoomByUsers, GetUserBySocketId, ListUsers } from '@/application/services'
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

  socket.on('start_chat', async (data, cb) => {
    const userLogged = await new GetUserBySocketId().getById(socket.id)

    let room = await new GetChatRoomByUsers().getByUser([userLogged._id, data.idUser])

    if (!room) {
      room = await new CreateChatRoom().create([userLogged._id, data.idUser])
    }

    cb(room)
  })
})
