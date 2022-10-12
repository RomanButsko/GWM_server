import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = 7500;

async function start() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('GWM-Docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log('сервер запущен на порту' + PORT);
}
start();
