import { CreateChatRoom } from '@/application/services/create.chat.room'
import { CreateUser } from '@/application/services/create.user'
import { GetChatRoomByUsers } from '@/application/services/get.chat.room.by.users'
import { GetUserBySocketId } from '@/application/services/get.user.by.socket.id'
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

  socket.on('start_chat', async (data, cb) => {
    const userLogged = await new GetUserBySocketId().getById(socket.id)

    let room = await new GetChatRoomByUsers().getByUser([userLogged._id, data.idUser])

    if (!room) {
      room = await new CreateChatRoom().create([userLogged._id, data.idUser])
    }

    cb(room)
  })
})
