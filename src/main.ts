import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 유효하지 않는건 Validator에 도달하지 않음
      forbidNonWhitelisted: true, // 요청을 막아버림
      transform: true, // query는 string으로 들어오는데,, 이를 처리
    }),
  );
  await app.listen(3000);
}
bootstrap();
