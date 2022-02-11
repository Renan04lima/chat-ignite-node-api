import mongoose, { Document, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { User } from './User'

type ChatRoom = Document & {
  idUsers: User[]
  idChatRoom: string
}

const ChatRoomSchema = new Schema({
  idUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }],
  idChatRoom: {
    type: String,
    default: v4()
  }
})

const ChatRoom = mongoose.model<ChatRoom>('ChatRoom', ChatRoomSchema)

export { ChatRoom }
