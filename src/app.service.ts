import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
// import { RSVP } from './app.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RsvpModel } from './app.entity';

export interface Rsvp {
  id: number;
  name: string;
  side: string;
  count: number;
  registed_at: Date;
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(RsvpModel)
    private readonly rsvpRepository: Repository<RsvpModel>
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  regist(name: string): string {
    console.log(name);
    return `${name}, hello!`;
  }

  async getGuestsCount() {
    
    const guestsCount = await this.rsvpRepository.count();
    return guestsCount;
  }

  async getAllGuests() {
    return this.rsvpRepository.find();
  }

  async getGuestById(id: number) {
    const guest = await this.rsvpRepository.findOne({ //repository 사용한 모든 함수는 비동기
      where: {
        id
      }
    });
    if (!guest) {
      throw new NotFoundException();
    }

    return guest;
  }

  async registGuest(name: string, side: string, count: number) {
    // 1. create : 저장할 객체 생성
    // 2. save : 객체를 저장

    const guest = this.rsvpRepository.create({
      name,
      side,
      count
    });
    
    const newGuest = await this.rsvpRepository.save(guest);
    return newGuest;
  }

  async getTotalCountSum(side: string) {
    let total = 0;
    const objs = await this.rsvpRepository.find();
    for (const obj of objs) {
      if (obj.side === side) {
        total += obj.count;
      } else if (side === "all") {
        total += obj.count;
      }
    }
    return total;
  }

}