import 'reflect-metadata';
import { useKoaServer } from 'routing-controllers';
import * as Koa from 'koa';
import { Server } from 'http';
import { secret } from './__init__/jwt';
import * as IO from 'socket.io';
import * as socketIoJwtAuth from 'socketio-jwt-auth';
import { authorizationChecker } from './lib/helpers/authorizationChecker';
import logger from './__init__/logger';
import setupDb from './__init__/db';

import Service from './controller/Service';
import Login from './controller/Login';
import User from './controller/User';
import Setup from './controller/Setup';

const app = new Koa();
const server = new Server(app.callback());
export const io = IO(server);

const port = process.env.PORT || 4000;

useKoaServer(app, {
  cors: true,
  controllers: [Setup, Service, Login, User],
  // controllers: [__dirname + '/controller/*.ts'],
  authorizationChecker,
});

io.use(
  socketIoJwtAuth.authenticate({ secret }, async (payload, done) => {
    const user = await User.findOne(payload.id);
    if (user) {
      done(null, user);
    } else {
      done(null, false, `Invalid JWT user ID`);
    }
  }),
);

io.on('connect', (socket) => {
  const name = socket.request.user.firstName;
  console.log(`User ${name} just connected`);

  socket.on('disconnect', () => {
    console.log(`User ${name} just disconnected`);
  });
});

setupDb().then(() => {
  try {
    server.listen(port);
    logger.info(`Listening on port ${port}`);
  } catch (err) {
    logger.error({ error: err });
    logger.log('error', { error: err });
  }
});
