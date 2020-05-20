import { JsonController, Get } from 'routing-controllers';
import logger from '../logger';

import Service from './entity';

@JsonController()
export default class ServiceController {
  @Get('/health')
  async getHealth() {
    logger.log('info', 'request received at /health');

    return {
      health: 'ok',
    };
  }

  // @Authorized()
  @Get('/health/add')
  async addCheck() {
    const newCheck = await Service.create({ message: 'health check ok' });

    logger.debug('record added to database');
    return newCheck.save();
  }
}
