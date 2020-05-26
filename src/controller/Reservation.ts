import {
  JsonController,
  Authorized,
  Post,
  Param,
  BodyParam,
  BadRequestError,
  CurrentUser,
  Get,
} from 'routing-controllers';
const moment = require('moment');
import { Role } from '../types';
import Account from '../entity/Account';
import Location from '../entity/Location';
import User from '../entity/User';
import TimeUnit from '../entity/TimeUnit';
import Reservation from '../entity/Reservation';
import logger from '../__init__/logger';
import { In } from 'typeorm';

@JsonController()
export default class ReservationController {
  @Authorized(Role.USER)
  @Post('/reservations/:timeUnitId/')
  async addReservation(
    @CurrentUser() user: User,
    @Param('timeUnitId') timeUnitId: number,
    @BodyParam('date') date: string,
  ) {
    const timeUnit = await TimeUnit.findOne(timeUnitId, {
      relations: ['location', 'location.account'],
    });

    if (!timeUnit) {
      throw new BadRequestError('No time unit found with that ID');
    }

    if (
      !user.accounts
        .map((account) => account.id)
        .includes(timeUnit.location.account.id)
    ) {
      throw new BadRequestError('User is not a member of the related account');
    }

    const dateMomentObject = moment(date, 'DD-MM-YYYY');
    const dateObject = new Date(
      dateMomentObject._pf.parsedDateParts[0],
      dateMomentObject._pf.parsedDateParts[1],
      dateMomentObject._pf.parsedDateParts[2],
    );

    const newReservation = await Reservation.create({
      date: dateObject,
      user,
      timeUnit,
    });

    return newReservation.save();
  }

  @Get('/reservations/:locationId')
  async getReservations(@Param('locationId') locationId: number) {
    const location = await Location.findOne(locationId, {
      relations: ['timeUnits'],
    });

    if (!location) {
      throw new BadRequestError('No location found with that ID');
    }

    const reservations = await Reservation.find({
      where: { timeUnit: In(location.timeUnits.map((unit) => unit.id)) },
      relations: ['timeUnit'],
    });
    return { reservations };
  }
}
