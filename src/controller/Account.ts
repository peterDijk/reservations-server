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
  @Authorized(Role.USER)
  @Post('/accounts')
  async createAccount(
    @CurrentUser() currentUser: User,
    @BodyParam('name') name: string,
    @BodyParam('desc') desc: string,
  ) {
    const newAccount = await Account.create({
      name,
      accountDescription: desc,
      administrator: currentUser,
    });

    const saveAccount = await newAccount.save();
    currentUser.roles = roleLevels(Role.ACCOUNT_ADMIN);

    await currentUser.save();

    return saveAccount;
  }

  @Get('/accounts')
  async listAccounts() {
    return Account.find({ relations: ['administrator'] });
  }
}
