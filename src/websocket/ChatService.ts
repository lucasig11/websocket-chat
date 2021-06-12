import { container } from 'tsyringe';

import { CreateChatRoomService } from '../services/CreateChatRoomService';
import { CreateMessageService } from '../services/CreateMessageService';
import { CreateUserService } from '../services/CreateUserService';
import { GetRoomMessagesService } from '../services/GetRoomMessagesService';
import { GetUsersBySocketIDService } from '../services/GetUsersBySocketIDService';
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

    const listClients = container.resolve(GetUsersBySocketIDService);

    const clients = sockets.reduce<string[]>((result, soc) => {
      if (soc.id !== socket.id) result.push(soc.id);
      return result;
    }, []);

    const users = await listClients.execute({ clients });

    callback(users);
  });

  socket.on('chat:initPrivate', async (data, callback) => {
    const createChatRoom = container.resolve(CreateChatRoomService);

    const getUsersBySocketId = container.resolve(GetUsersBySocketIDService);
    const getRoomMessages = container.resolve(GetRoomMessagesService);

    const [user] = await getUsersBySocketId.execute({
      clients: [socket.id],
    });

    const room = await createChatRoom.execute([user._id, data.idUser]);

    const roomMessages = await getRoomMessages.execute(room.id);

    socket.join(room.id);

    callback(room, roomMessages);
  });

  socket.on('chat:message', async ({ message, room_id }) => {
    const createMessage = container.resolve(CreateMessageService);
    const getUsersBySocketId = container.resolve(GetUsersBySocketIDService);

    const [user] = await getUsersBySocketId.execute({
      clients: [socket.id],
    });

    const new_message = await createMessage.execute({
      message,
      room_id,
      from: user._id,
    });

    io.to(room_id).emit('chat:message', {
      message: new_message,
      user,
    });
  });
});
