import {
  JsonController,
  Authorized,
  Post,
  Param,
  BodyParam,
  BadRequestError,
} from 'routing-controllers';
import { roleLevels } from '../lib/helpers/roles';
import { Role } from '../types';
import Account from '../entity/Account';
import Location from '../entity/Location';

@JsonController()
export default class LocationController {
  @Authorized(Role.ACCOUNT_ADMIN)
  @Post('/accounts/:accountId/locations')
  async createLocation(
    @Param('accountId') accountId: number,
    @BodyParam('name') name: string,
    @BodyParam('capacity') capacity: number,
  ) {
    const account = await Account.findOne({ id: accountId });
    if (!account) {
      throw new BadRequestError('No account exists with that ID');
    }

    const newLocation = Location.create({ name, capacity, account });
    return newLocation.save();
  }
}
