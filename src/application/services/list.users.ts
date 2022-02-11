import { User } from '@/infra/mongo/schemas'

export class ListUsers {
  async list (): Promise<any[]> {
    return User.find()
  }
}
