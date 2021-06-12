import mongoose, { Document, Schema } from 'mongoose';

type Message = Document & {
  to: string;
  text: string;
  room_id: string;
  created_at: Date;
};

const MessageSchema = new Schema({
  to: {
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
  text: String,
});

const Message = mongoose.model<Message>('Message', MessageSchema);

export { Message };
