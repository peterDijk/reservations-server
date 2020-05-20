import { JsonController, Get } from 'routing-controllers';

@JsonController()
export default class ServiceController {
  @Get('/health')
  async getHealth() {
    return {
      health: 'ok',
    };
  }
}
