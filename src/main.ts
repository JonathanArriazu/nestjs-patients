import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  //const PORT = app.get(ConfigService).get<number>('PORT');
  const PORT = configService.get<number>('PORT');

  await app.listen(PORT);
}
bootstrap();
