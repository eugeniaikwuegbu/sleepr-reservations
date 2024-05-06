import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AuthModule);

  const options = {
    host: '0.0.0.0',
    port: configService.get('TCP_PORT'),
  };
  app.connectMicroservice({ transport: Transport.TCP, options });

  app.use(cookieParser());
  app.useLogger(app.get(Logger));

  app.startAllMicroservices();

  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
