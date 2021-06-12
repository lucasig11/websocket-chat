import { injectable } from 'tsyringe';

import { User } from '../schemas/User';

interface IRequest {
  clients: string[];
}

@injectable()
export class GetUsersBySocketIDService {
  public async execute({ clients }: IRequest): Promise<User[]> {
    return User.find({
      socket_id: { $in: clients },
    });
  }
}
