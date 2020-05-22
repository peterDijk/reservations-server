import { JsonController, Post, Body, BadRequestError } from 'routing-controllers';
import User from '../entity/User';

interface SetupInput {
  password: string;
  email: string;
}

@JsonController()
export default class SetupController {
  @Post('/setup')
  async setup(@Body() { password, email }: SetupInput) {
    const existingCheck = await User.count();
    if (existingCheck > 0) {
      throw new BadRequestError(`Setup is already done`);
    }

    const entity = User.create({
      username: 'superadmin',
      email,
      isSuperAdmin: true,
      isAdmin: true,
    });

    await entity.setPassword(password);

    return entity.save();
  }
}
