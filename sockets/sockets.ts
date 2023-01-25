import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const connectedUsers = new UserList();

export const connectingClient = (client: Socket, io: socketIO.Server) => {
  const user = new User(client.id);

  connectedUsers.addUser(user);
};

export const disconnect = (client: Socket, io: socketIO.Server) => {
  client.on('disconnect', () => {
    console.log('user disconnected');
    connectedUsers.deleteUser(client.id);
    io.emit('active-users', connectedUsers.getList());
  });
};

//Listen messages
export const message = (client: Socket, io: socketIO.Server) => {
  client.on('message', (payload: { from: string; body: string }) => {
    console.log('Message received', payload);

    io.emit('new-message', payload);
  });
};

// Config user

export const configUser = (client: Socket, io: socketIO.Server) => {
  client.on('user-config', (payload: { name: string }, callback: Function) => {
    connectedUsers.updateName(client.id, payload.name);
    console.log('configuring user: ', payload.name);
    io.emit('active-users', connectedUsers.getList());
    callback({
      ok: true,
      message: `User ${payload.name}, configured`,
    });
  });
};

export const getUsers = (client: Socket, io: socketIO.Server) => {
  client.on('get-list', () => {
    io.to(client.id).emit('active-users', connectedUsers.getList());
  });
};
