import { Message } from '@/infra/mongo/schemas'

export class GetMessageByChatRoom {
  async getByChatRoom (roomId: string): Promise<any> {
    return Message.find({
      roomId
    })
      .populate('to')
      .exec()
  }
}
