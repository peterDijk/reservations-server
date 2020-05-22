import { io } from '..';
import * as socketIoJwtAuth from 'socketio-jwt-auth';
import { secret } from '../__init__/jwt';
import User from '../entity/User';

export default () => {
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
};
