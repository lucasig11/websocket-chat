import { injectable } from 'tsyringe';

import { ChatRoom } from '../schemas/ChatRoom';

@injectable()
export class CreateChatRoomService {
  public async execute(users: string[]): Promise<ChatRoom> {
    return ChatRoom.create({ users });
  }
}
