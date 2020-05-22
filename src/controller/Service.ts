import { JsonController, Get, Req, Authorized } from 'routing-controllers';
import { Request } from 'koa';
import logger from '../__init__/logger';

import Service from '../entity/Service';

@JsonController()
export default class ServiceController {
  @Get('/health')
  getHealth(@Req() request: Request) {
    logger.log('info', 'request received at /health');

    return {
      health: 'ok',
      request: JSON.stringify(request),
    };
  }

  @Authorized()
  @Get('/health/add')
  async addCheck() {
    const newCheck = await Service.create({ message: 'health check ok' });

    logger.debug('record added to database');
    return newCheck.save();
  }

  @Get('/health/list')
  async getChecks() {
    const checks = await Service.find({
      order: { ['dateCreated']: 'DESC' },
    });
    return { checks };
  }
}
