const dotenv = require('dotenv');
dotenv.config();

import 'reflect-metadata';
import { createKoaServer } from 'routing-controllers';
import * as IO from 'socket.io';
import { authorizationChecker } from './lib/helpers/authorizationChecker';
import logger from './__init__/logger';
import setupDb from './__init__/db';
import socketioInit from './__init__/socketio';

const port = process.env.PORT || 4000;

const server = createKoaServer({
  cors: false,
  controllers: [__dirname + '/controller/*.ts'],
  authorizationChecker,
});

export const io = IO(server);

socketioInit();

setupDb().then(() => {
  try {
    server.listen(port);
    logger.info(`Listening on port ${port}`);
  } catch (err) {
    logger.error({ error: err });
    logger.log('error', { error: err });
  }
});
