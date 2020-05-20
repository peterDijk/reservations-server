import { useKoaServer } from 'routing-controllers';
import * as Koa from 'koa';
import { Server } from 'http';
import { secret } from './jwt';
import * as IO from 'socket.io';
import * as socketIoJwtAuth from 'socketio-jwt-auth';
import { authorizationChecker } from './lib/helpers/authorizationChecker';

import Service from './service/controller';

const app = new Koa();
const server = new Server(app.callback());
export const io = IO(server);

const port = process.env.PORT || 4000;

useKoaServer(app, {
  cors: true,
  controllers: [Service],
  authorizationChecker,
});

io.use(
  socketIoJwtAuth.authenticate({ secret }, async (payload, done) => {
    // const user = await User.findOne(payload.id);
    // if (user) done(null, user); else {
    done(null, false, `Invalid JWT user ID`);
  }),
);

io.on('connect', (socket) => {
  const name = socket.request.user.firstName;
  console.log(`User ${name} just connected`);

  socket.on('disconnect', () => {
    console.log(`User ${name} just disconnected`);
  });
});

// TODO: install logger tool
try {
  server.listen(port);
  console.log(`Listening on port ${port}`);
} catch (err) {
  console.log(err);
}
