import { server } from './http';
import '../websocket/ChatService';

server.listen(3333, () =>
  console.info('[\x1b[92mSUCCESS\x1b[0m]', 'Server started.')
);
