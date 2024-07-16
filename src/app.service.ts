import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
// import { RSVP } from './app.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RsvpModel } from './app.entity';

export interface Rsvp {
  id: number;
  name: string;
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

  async registGuest(name: string) {
    // 1. create : 저장할 객체 생성
    // 2. save : 객체를 저장

    const guest = this.rsvpRepository.create({
      name
    });
    
    const newGuest = await this.rsvpRepository.save(guest);

    return newGuest;
  }

  // async addDataToJSON(id: number, requestDateTime: Date, name: string): Promise<void> {
  //   const newData = {
  //     id,
  //     requestDateTime: requestDateTime.toISOString(), // ISO 문자열로 변환하여 저장
  //     name,
  //   };

  //   try {
  //     let jsonData = [];
  //     if (fs.existsSync(this.filePath)) {
  //       const fileContent = fs.readFileSync(this.filePath, 'utf-8');
  //       jsonData = JSON.parse(fileContent);
  //       console.log(newData.name  + "  push?");
  //     }

  //     jsonData.push(newData);

  //     console.log(jsonData.length);
  //     fs.writeFileSync(this.filePath, JSON.stringify(jsonData, null, 2));
  //   } catch (error) {
  //     console.error('Error adding data to JSON file:', error);
  //     throw error;
  //   }
  // }

  // async addDataToDatabase(name: string): Promise<void> {
  //   const newData = new RSVP();
  //   newData.name = name;

  //   await this.rsvpRepository.save(newData);
  // }
}