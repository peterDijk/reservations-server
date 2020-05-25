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
export default class ReservationController {
  @Authorized(Role.USER)
  @Post('/reservations/:timeUnitId/')
  async addReservation(
    @CurrentUser() user: User,
    @BodyParam('timeUnitId') timeUnitId: number,
    @BodyParam('date') date: string,
  ) {
    const timeUnit = await TimeUnit.findOne(timeUnitId, {
      relations: ['location', 'location.account'],
    });

    if (!timeUnit) {
      throw new BadRequestError('No time unit found with that ID');
    }

    const location = await Location.findOne(timeUnit.location.id, {
      relations: ['account'],
    });

    if (!location) {
      throw new BadRequestError('No location with that ID');
    }

    const dateMomentObject = moment(date, 'DD-MM-YYYY');
    const dateObject = new Date(
      dateMomentObject._pf.parsedDateParts[0],
      dateMomentObject._pf.parsedDateParts[1],
      dateMomentObject._pf.parsedDateParts[2],
    );

    logger.info(dateObject);

    const newReservation = await Reservation.create({
      date: dateObject,
      user,
      timeUnit,
    });

    return newReservation.save();
  }
}
