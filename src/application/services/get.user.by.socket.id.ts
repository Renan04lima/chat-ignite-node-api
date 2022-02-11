import { User } from '@/infra/mongo/schemas'

export class GetUserBySocketId {
  async getById (socket_id: string): Promise<any> {
    return User.findOne({
      socket_id
    }).exec()
  }
}
