import { Message } from '@/infra/mongo/schemas'

type MessageDTO = {
  to: string
  text: string
  roomId: string
}

export class CreateMessage {
  async create (input: MessageDTO): Promise<any> {
    return Message.create(input)
  }
}
