import Server from './classes/server';
import { SERVER_PORT } from './global/environment';
import router from './routes/router';
import express from 'express';
import cors from 'cors';

const server = new Server();
//Parser
server.app.use(express.json());
//Cors
server.app.use(cors({ origin: true, credentials: true }));
//Routes
server.app.use('/', router);
//Start server
server.start(() => {
  console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});
