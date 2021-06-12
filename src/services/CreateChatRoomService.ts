import { ObjectId } from 'mongoose';
import { injectable } from 'tsyringe';

import { ChatRoom } from '../schemas/ChatRoom';

@injectable()
export class CreateChatRoomService {
  public async execute(idUsers: ObjectId[]): Promise<ChatRoom> {
    const findUsersRoom = await ChatRoom.findOne({
      users: {
        $all: idUsers,
      },
    }).exec();

    if (findUsersRoom) {
      console.log('has room');
      return findUsersRoom;
    }

    return ChatRoom.create({ users: idUsers });
  }
}
