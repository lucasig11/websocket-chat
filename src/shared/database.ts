import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/db_websocket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
