import { Action, BadRequestError } from 'routing-controllers';
import { verify } from '../../__init__/jwt';

export const authorizationChecker = (action: Action) => {
  const header: string = action.request.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    const [, token] = header.split(' ');

    try {
      return !!(token && verify(token));
    } catch (e) {
      throw new BadRequestError(e);
    }
  }

  return false;
};
