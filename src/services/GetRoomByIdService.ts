import { injectable } from 'tsyringe';

import { ChatRoom } from '../schemas/ChatRoom';

@injectable()
export class GetRoomByIdService {
  public async execute(room_id: string): Promise<ChatRoom> {
    const [room] = await ChatRoom.find({ id: room_id })
      .populate('users')
      .exec();
    return room;
  }
}
