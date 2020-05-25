import { Action, BadRequestError } from 'routing-controllers';
import { verify } from '../../__init__/jwt';
import { Role } from '../../types';
import User from '../../entity/User';
import logger from '../../__init__/logger';

export const authorizationChecker = async (action: Action, roles: Role[]) => {
  const header: string = action.request.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    const [, token] = header.split(' ');

    const jwtObject = verify(token);

    try {
      const user = await User.findOne({ id: jwtObject.id });

      if (user && !roles.length) {
        return true;
      }

      if (user && roles.find((role) => user.roles.includes(role))) {
        return true;
      }
    } catch (e) {
      throw new BadRequestError(e);
    }
  }

  return false;
};

export const currentUserChecker = async (action: Action) => {
  const header: string = action.request.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    const [, token] = header.split(' ');

    if (token) {
      const { id } = verify(token);
      return User.findOne(id, { relations: ['accounts'] });
    }
  }
  return undefined;
};
