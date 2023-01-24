import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const connectedUsers = new UserList();

export const connectingClient = (client: Socket) => {
  const user = new User(client.id);

  connectedUsers.addUser(user);
};

export const disconnect = (client: Socket) => {
  client.on('disconnect', () => {
    connectedUsers.deleteUser(client.id);
    console.log('user disconnected');
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

    callback({
      ok: true,
      message: `User ${payload.name}, configured`,
    });
  });
};
