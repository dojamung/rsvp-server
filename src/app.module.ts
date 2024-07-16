import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RsvpModel } from './app.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal', // Docker 컨테이너가 실행 중인 호스트 IP
      port: 5435, // PostgreSQL 포트
      username: 'postgres',
      password: 'kimdoh1!',
      database: 'postgres',
      entities: [
        RsvpModel
      ],
      // autoLoadEntities: true,
      synchronize: true, // 개발 환경에서만 사용. Production에서는 false로 설정
    }),
    TypeOrmModule.forFeature([
      RsvpModel
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
