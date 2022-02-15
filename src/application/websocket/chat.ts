import { CreateChatRoom, CreateUser, GetChatRoomByUsers, GetUserBySocketId, ListUsers, CreateMessage, GetMessageByChatRoom, GetChatRoomById } from '@/application/services'
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

    await socket.join(room.idChatRoom)

    const messages = await new GetMessageByChatRoom().getByChatRoom(room.idChatRoom)

    // eslint-disable-next-line node/no-callback-literal
    cb({ room, messages })
  })

  socket.on('message', async (data) => {
    const user = await new GetUserBySocketId().getById(socket.id)

    const message = await new CreateMessage().create({
      to: user._id,
      text: data.message,
      roomId: data.idChatRoom
    })

    io.to(data.idChatRoom).emit('message', {
      message,
      user
    })
    const room = await new GetChatRoomById().getById(data.idChatRoom)
    const userFrom = room.idUsers.find((users: { _id: any }) => String(users._id) !== String(user._id))
    io.to(userFrom.socket_id).emit('notification', {
      newMessage: true,
      roomId: data.idChatRoom,
      from: user
    })
  })
})
