import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config'
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Primero se configura los pipes de validación
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  /* app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'], //Kafka container name
      },
      consumer: {
        groupId: 'core-consumer',
      }
    },
  });
  */

  await app.startAllMicroservices();
  //Por último, se inicia el servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

