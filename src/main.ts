import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  if (process.env.INIT_SWAGGER) {
    const config = new DocumentBuilder().setTitle('TodoApp API').build();
    const document = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('explorer', app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });

    app.enableCors();
    app.use(bodyParser.json({ limit: '25mb' }));
    app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
    app.useGlobalPipes(new ValidationPipe());
    app.use((req: Request, _res: Response, next: NextFunction) => {
      console.log(new Date(), ' ', req.method, ' ', req.path);
      next();
    });
  }

  app
    .listen(5001)
    .then(() => console.log('todoapp api running at 5001', new Date()));
}

bootstrap();
