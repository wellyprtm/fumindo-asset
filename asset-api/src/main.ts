import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN', 'http://localhost:5173')
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )
  await app.listen(config.get<number>('PORT', 3000));
}
await bootstrap();
