import {
  JsonController,
  Authorized,
  Post,
  Param,
  BodyParam,
  BadRequestError,
  CurrentUser,
} from 'routing-controllers';
const moment = require('moment');
import { Role } from '../types';
import Account from '../entity/Account';
import Location from '../entity/Location';
import User from '../entity/User';
import TimeUnit from '../entity/TimeUnit';
import Reservation from '../entity/Reservation';
import logger from '../__init__/logger';

@JsonController()
export default class LocationController {
  @Authorized(Role.ACCOUNT_ADMIN)
  @Post('/accounts/locations')
  async createLocation(
    @CurrentUser() user: User,
    @BodyParam('accountId') accountId: number,
    @BodyParam('name') name: string,
  ) {
    if (!accountId) {
      throw new BadRequestError('Provide a account ID');
    }
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

    const newLocation = Location.create({ name, account });
    return newLocation.save();
  }

  @Authorized(Role.ACCOUNT_ADMIN)
  @Post('/locations/timeunits')
  async addTimeUnit(
    @CurrentUser() user: User,
    @BodyParam('locationId') locationId: number,
    @BodyParam('name') name: string,
    @BodyParam('capacity') capacity: number,
  ) {
    if (!locationId || !capacity || !name) {
      throw new BadRequestError('Provide a name, capacity and locationId');
    }

    const location = await Location.findOne(locationId, {
      relations: ['account'],
    });

    if (!location) {
      throw new BadRequestError('No location exists with that ID');
    }

    const account = await Account.findOne(location.account.id, {
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

    const newTimeUnit = await TimeUnit.create({ name, capacity, location });

    return newTimeUnit.save();
  }
}
