import {
  JsonController,
  Authorized,
  CurrentUser,
  Post,
  Get,
  BodyParam,
} from 'routing-controllers';
import User from '../entity/User';
import Account from '../entity/Account';
import { Role } from '../types';
import { roleLevels } from '../lib/helpers/roles';

@JsonController()
export default class AccountController {
  @Authorized(roleLevels(Role.USER))
  @Post('/accounts')
  async createAccount(
    @CurrentUser() currentUser: User,
    @BodyParam('name') name: string,
    @BodyParam('desc') desc: string,
  ) {
    const user = await User.findOne(currentUser);

    const newAccount = await Account.create({
      name,
      accountDescription: desc,
      administrator: user,
    });

    const saveAccount = await newAccount.save();
    user.roles = roleLevels(Role.ACCOUNT_ADMIN);

    await user.save();

    return saveAccount;
  }

  @Get('/accounts')
  async listAccounts() {
    return Account.find();
  }
}
