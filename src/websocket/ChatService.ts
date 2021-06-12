import { container } from 'tsyringe';

import CreateUserService from '../services/CreateUserService';
import { io } from '../shared/http';

io.on('connect', (socket) => {
  socket.on('chat:createAccount', async (data) => {
    const { email, name, avatar } = data;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      name,
      avatar,
      socket_id: socket.id,
    });

    console.log(user);
  });
});
