import {
  JsonController,
  Authorized,
  CurrentUser,
  Post,
  Get,
  BodyParam,
  BadRequestError,
} from 'routing-controllers';
import User from '../entity/User';
import Account from '../entity/Account';
import { Role } from '../types';
import { roleLevels } from '../lib/helpers/roles';
import generateInvite from '../lib/helpers/generateInvite';

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

  @Authorized(Role.ACCOUNT_ADMIN)
  @Post('/accounts/generateInvite')
  async newInviteToken(
    @CurrentUser() currentUser: User,
    @BodyParam('accountId') accountId: number,
  ) {
    const account = await Account.findOne(accountId, {
      relations: ['members', 'administrator'],
    });

    if (!account) {
      throw new BadRequestError('No Account found with that id');
    }

    if (account.administrator.id !== currentUser.id) {
      throw new BadRequestError(
        'You are not the administrator of this account',
      );
    }

    const newInviteToken = generateInvite();

    const checkGenerated = (token) => {
      if (account.invitationToken === token) {
        return checkGenerated(generateInvite());
      }
      account.invitationToken = token;
      return;
    };

    checkGenerated(newInviteToken);
    return account.save();
  }

  @Authorized(Role.USER)
  @Post('/accounts/members')
  async addMember(
    @CurrentUser() currentUser: User,
    @BodyParam('accountId') accountId: number,
    @BodyParam('inviteToken') inviteToken?: string,
  ) {
    const account = await Account.findOne(accountId, {
      relations: ['members'],
    });

    if (!account) {
      throw new BadRequestError('No Account found with that id');
    }

    if (account.invitationToken && !inviteToken) {
      throw new BadRequestError(
        'An invitation token is required for this account',
      );
    }

    if (account.invitationToken !== inviteToken) {
      throw new BadRequestError('Invalid invite token');
    }

    account.members.push(currentUser);
    return account.save();
  }

  @Get('/accounts')
  async listAccounts() {
    return Account.find({ relations: ['administrator', 'members'] });
  }
}
