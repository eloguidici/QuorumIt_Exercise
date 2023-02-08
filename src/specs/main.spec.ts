/**
 * @file Users Management Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from '../app.module';

describe('Bootstrap function', () => {
  it('creates a Nest application', async () => {
    const app = await NestFactory.create(AppModule);
    expect(app).toBeDefined();
  });

  it('configures SwaggerModule', async () => {
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
    expect(document).toBeDefined();
  });

  it('listens on port 3000', async () => {
    const app = await NestFactory.create(AppModule);
    const server = await app.listen(3000);
    expect(server.address().port).toBe(3000);
  });
});
