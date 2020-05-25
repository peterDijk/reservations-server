import {
  JsonController,
  Post,
  Body,
  Param,
  BadRequestError,
} from 'routing-controllers';
import User from '../entity/User';
import { sign, verify } from '../__init__/jwt';
import { sgMail } from '../lib/helpers/sendmail';

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

    const token = sign(jwtObject, '30m');

    const msg = {
      to: user.email,
      from: 'peter@petervandijk.net',
      subject: 'reservations password reset',
      text: `use this token to reset: ${token}`,
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    await sgMail.send(msg);

    return { message: `token has been emailed to ${user.email}` };
  }

  @Post('/reset/:token')
  async resetPasswd(
    @Param('token') token: string,
    @Body() { password }: ResetPasswdInput,
  ) {
    const jwtPayload = verify(token);

    if (!jwtPayload) {
      // actually, verify will throw BadRequest already
      throw new BadRequestError('token invalid');
    }

    const user = await User.findOne({ where: { id: jwtPayload.id } });

    if (!user) {
      return { message: 'User does not exist' };
    }

    await user.setPassword(password);

    return user.save();
  }
}
