import {
  JsonController,
  Post,
  Body,
  BadRequestError,
} from 'routing-controllers';
import User from '../entity/User';
import { roleLevels } from '../lib/helpers/roles';
import { Role } from '../types';

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
      roles: roleLevels(Role.SUPERADMIN),
    });

    await entity.setPassword(password);

    return entity.save();
  }
}
