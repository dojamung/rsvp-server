import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as https from 'https';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('../secrets/private-key.pem'),
  //   cert: fs.readFileSync('../secrets/public-certificate.pem'),
  // };

  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
  });

    // CORS 설정
    const corsOptions: CorsOptions = {
      origin: 'https://dojamung.github.io', // 허용할 도메인
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
      credentials: true, // 자격 증명 허용 여부
    };
    app.enableCors(corsOptions);



  await app.listen(3000);
  console.log('Server running on https://localhost:3000');
}
bootstrap();
