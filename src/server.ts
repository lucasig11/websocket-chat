import { server } from './http';

server.listen(3333, () =>
  console.info('[\x1b[92mSUCCESS\x1b[0m]', 'Server started.')
);
