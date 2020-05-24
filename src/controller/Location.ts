import {
  JsonController,
  Authorized,
  Post,
  Param,
  BodyParam,
  BadRequestError,
  CurrentUser,
} from 'routing-controllers';
import { Role } from '../types';
import Account from '../entity/Account';
import Location from '../entity/Location';
import User from '../entity/User';

@JsonController()
export default class LocationController {
  @Authorized(Role.ACCOUNT_ADMIN)
  @Post('/accounts/:accountId/locations')
  async createLocation(
    @CurrentUser() user: User,
    @Param('accountId') accountId: number,
    @BodyParam('name') name: string,
    @BodyParam('capacity') capacity: number,
  ) {
    const account = await Account.findOne(accountId, {
      relations: ['administrator'],
    });

    if (!account) {
      throw new BadRequestError('No account exists with that ID');
    }

    if (!account.administrator) {
      throw new BadRequestError('no administrator with this account');
    }

    if (account.administrator.id !== user.id) {
      throw new BadRequestError(
        'You are not the administrator of this account',
      );
    }

    const newLocation = Location.create({ name, capacity, account });
    return newLocation.save();
  }
}
