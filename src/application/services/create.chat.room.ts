import { ChatRoom } from '@/infra/mongo/schemas'

export class CreateChatRoom {
  async create (idUsers: string[]): Promise<any> {
    return ChatRoom.create({
      idUsers
    })
  }
}
