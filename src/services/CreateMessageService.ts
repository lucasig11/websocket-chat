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
    const new_message = await Message.create({ message, from, room_id });

    return new_message.populate('from').execPopulate();
  }
}
