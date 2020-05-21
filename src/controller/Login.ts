import { IsString } from 'class-validator';
import { JsonController, Post, Body, BadRequestError } from 'routing-controllers';
import { sign } from '../__init__/jwt';
import User from '../entity/User';

interface AuthenticatePayload {
  username: string;
  password: string;
}

@JsonController()
export default class LoginController {
  @Post('/login')
  async authenticate(@Body() { username, password }: AuthenticatePayload) {
    const user = await User.findOne({ where: { userName: username } });
    if (!user || !user.id) throw new BadRequestError('A user with this username does not exist');

    if (!(await user.checkPassword(password)))
      throw new BadRequestError('The password is not correct');

    const jwtObject = {
      id: user.id,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
    };

    const jwt = sign(jwtObject);
    return { jwt };
  }
}
