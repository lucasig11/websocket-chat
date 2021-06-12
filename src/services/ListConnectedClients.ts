import { injectable } from 'tsyringe';

import { User } from '../schemas/Users';

interface IRequest {
  clients: string[];
}

@injectable()
export default class ListConnectedClient {
  public async execute({ clients }: IRequest): Promise<User[]> {
    const users = await User.find({
      socket_id: { $in: clients },
    });

    return users;
  }
}
