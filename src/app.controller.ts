import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService, Rsvp } from './app.service';

@Controller('guests')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('regist')
  // regist(@Body('name') name: string): Promise<string> {
  //     return this.appService.regist(name);
  // }

  @Get('count')
  getGuestsCount() {
    return this.appService.getGuestsCount();
  }

  @Get('all')
  getAllGuests() {
    return this.appService.getAllGuests();
  }

  @Get('get/:id')
  getGuest(@Param('id') id: number) {
    return this.appService.getGuestById(id);
  }

  @Post('regist')
  registGuest(@Body('name') name: string, @Body('side') side: string, @Body('count') count: number) {
    return this.appService.registGuest(name, side, count);
  }

  @Get(':side/sum')
  getTotalCountSum(@Param('side') side: string ) {
    return this.appService.getTotalCountSum(side);
  }

}
