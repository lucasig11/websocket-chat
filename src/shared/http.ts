import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';

import './database';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(process.cwd(), 'public')));

export { server, io };
