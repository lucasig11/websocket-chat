import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { User } from './Users';

type ChatRoom = Document & {
  users: User[];
  id: string;
};

const ChatRoomSchema = new Schema({
  users: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  id: {
    type: String,
    default: v4(),
  },
});

const ChatRoom = mongoose.model<ChatRoom>('ChatRoom', ChatRoomSchema);

export { ChatRoom };
