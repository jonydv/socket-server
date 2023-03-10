import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';
export default class Server {
  //Singletton pattern
  private static _instance: Server;

  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;
  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.listenSockets();
  }

  //If the class have an instance we return that, else we create one (for singleton purposes)
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private listenSockets() {
    console.log('listening connections - sockets');

    this.io.on('connection', (client) => {
      // Conecting client
      socket.connectingClient(client, this.io);

      //Config user
      socket.configUser(client, this.io);

      //Listen message
      socket.message(client, this.io);

      //Listen get users
      socket.getUsers(client, this.io);

      //Disconnect
      socket.disconnect(client, this.io);
    });
  }

  start(callback: VoidFunction) {
    this.httpServer.listen(this.port, callback);
  }
}
