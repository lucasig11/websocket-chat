import mongoose, { Document, Schema } from 'mongoose';

type Message = Document & {
  from: string;
  message: string;
  room_id: string;
  created_at: Date;
};

const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  room_id: {
    type: String,
    ref: 'ChatRoom',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  message: String,
});

const Message = mongoose.model<Message>('Message', MessageSchema);

export { Message };
