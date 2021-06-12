import { container } from 'tsyringe';

import CreateUserService from '../services/CreateUserService';
import ListConnectedClients from '../services/ListConnectedClients';
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

    socket.broadcast.emit('chat:newUsers', user);
  });

  socket.on('chat:getUsers', async (callback) => {
    const sockets = await io.fetchSockets();

    const listClients = container.resolve(ListConnectedClients);

    const clients = sockets.reduce<string[]>((result, soc) => {
      if (soc.id !== socket.id) result.push(soc.id);
      return result;
    }, []);

    const users = await listClients.execute({ clients });

    callback(users);
  });
});
