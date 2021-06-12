import { injectable } from 'tsyringe';

import { Message } from '../schemas/Message';

interface IRequest {
  message: string;
  from: string;
  room_id: string;
}

@injectable()
export class CreateMessageService {
  public async execute({ message, from, room_id }: IRequest): Promise<Message> {
    return Message.create({ message, from, room_id });
  }
}
