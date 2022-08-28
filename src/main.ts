import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const log = console.log;
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => log('running...'));
}

bootstrap();
