import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService, Rsvp } from './app.service';

@Controller('guests')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Post('regist')
  // regist(@Body('name') name: string): Promise<string> {
  //     return this.appService.regist(name);
  // }

  @Get('count')
  getGuestsCount() {
    return this.appService.getGuestsCount();
  }

  @Get()
  getAllGuests() {
    return this.appService.getAllGuests();
  }

  @Get(':id')
  getGuest(@Param('id') id: number) {
    return this.appService.getGuestById(id);
  }

  @Post('regist')
  registGuest(@Body('name') name: string) {
    return this.appService.registGuest(name);
  }

  // @Post('registR')
  // async registR(@Body() body: { name: string }): Promise<void> {
  //   const id = new Date().getTime(); // 임시로 현재 시간을 사용한 ID 생성
  //   const requestDateTime = new Date();
  //   const { name } = body;

  //   await this.appService.addDataToJSON(id, requestDateTime, name);
  // }
}
