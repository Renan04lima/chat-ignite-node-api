import { ChatRoom } from '@/infra/mongo/schemas'

export class GetChatRoomById {
  async getById (idChatRoom: string): Promise<any> {
    return ChatRoom.findOne({
      idChatRoom
    })
      .populate('idUsers')
      .exec()
  }
}
