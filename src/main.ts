import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Authorization App')
    .setDescription('The Authorization API description')
    .setVersion('1.0')
    .addTag('Health Check')
    .addTag('Login')
    .addTag('Roles')
    .addTag('Permissions')
    .addTag('Users')
    .addTag('Users Management')
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
