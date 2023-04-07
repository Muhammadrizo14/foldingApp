import { Controller, Get } from '@nestjs/common';
import { AppService, Rout } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Rout[] {
    return this.appService.getHello();
  }
}
