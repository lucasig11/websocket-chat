import { injectable } from 'tsyringe';

import { Message } from '../schemas/Message';

@injectable()
export class GetRoomMessagesService {
  public async execute(room_id: string): Promise<Message[]> {
    const messages = await Message.find({ room_id }).populate('from').exec();
    return messages;
  }
}
