import { User } from '@/infra/mongo/schemas'

type UserDTD = {
  email: string
  socket_id: string
  name: string
  avatar: string
}

export class CreateUser {
  async create ({ email, avatar, name, socket_id }: UserDTD): Promise<any> {
    const userAlreadyExists = await User.findOne({ email }).exec()

    if (userAlreadyExists != null) {
      return User.findOneAndUpdate(
        {
          _id: userAlreadyExists._id
        },
        {
          $set: { avatar, name, socket_id }
        },
        {
          new: true
        }
      )
    } else {
      return User.create({
        email, avatar, name, socket_id
      })
    }
  }
}
