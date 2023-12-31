import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
    cors: {
      origin: "http://127.0.0.1:5173"
    }
  });

export { serverHttp, io, app };