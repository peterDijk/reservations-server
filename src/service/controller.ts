import { JsonController, Get } from 'routing-controllers';
import logger from '../logger';

@JsonController()
export default class ServiceController {
  @Get('/health')
  async getHealth() {
    logger.log('info', 'request received at /health');
    return {
      health: 'ok',
    };
  }
}
