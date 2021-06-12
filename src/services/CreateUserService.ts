import { injectable } from 'tsyringe';

import { User } from '../schemas/User';

interface IRequest {
  name: string;
  email: string;
  avatar: string;
  socket_id: string;
}

@injectable()
export class CreateUserService {
  public async execute({
    name,
    email,
    avatar,
    socket_id,
  }: IRequest): Promise<User> {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { socket_id, avatar, name } },
      { useFindAndModify: false, new: true }
    );

    if (!user) {
      return User.create({ name, email, socket_id, avatar });
    }

    return user;
  }
}
