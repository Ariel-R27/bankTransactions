import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Primero se configura los pipes de validación
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  //Por último, se inicia el servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

