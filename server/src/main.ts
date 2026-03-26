import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      'http://localhost:8080',
      'http://178.72.185.4'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  await app.listen(3000);
}
bootstrap();
