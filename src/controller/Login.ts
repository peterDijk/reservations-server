import { IsString } from 'class-validator';
import { JsonController, Post, Body, BadRequestError } from 'routing-controllers';
import { sign } from '../__init__/jwt';
import User from '../entity/User';

class AuthenticatePayload {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

@JsonController()
export default class LoginController {
  @Post('/logins')
  async authenticate(@Body() { username, password }: AuthenticatePayload) {
    const user = await User.findOne({ where: { memberNumber: username } });
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
