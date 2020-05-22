import {
  JsonController,
  Post,
  Body,
  Param,
  BadRequestError,
} from 'routing-controllers';
import User from '../entity/User';
import { sign } from '../__init__/jwt';

interface ResetRequestInput {
  email: string;
}

interface ResetPasswdInput {
  password: string;
}

@JsonController()
export default class ResetPassword {
  @Post('/reset')
  async requestReset(@Body() { email }: ResetRequestInput) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestError('No user exists with that email');
    }

    const jwtObject = {
      id: user.id,
    };

    const token = sign(jwtObject);
    return { token };
  }

  @Post('/reset/:token')
  async resetPasswd(
    @Param('token') token: string,
    @Body() { password }: ResetPasswdInput,
  ) {}
}
