import { ChatRoom } from '@/infra/mongo/schemas'
import { ObjectId } from 'mongoose'

export class GetChatRoomByUsers {
  async getByUser (idUsers: ObjectId[]): Promise<any> {
    return ChatRoom.findOne({
      idUsers: {
        $all: idUsers
      }
    }).exec()
  }
}
