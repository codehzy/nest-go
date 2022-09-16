import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { createSwagger } from './swagger';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  createSwagger(app);
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  await app.listen(3333, () => {
    Logger.log(`API服务已经启动,服务请访问:http://localhost:${3333}`);
    Logger.log(`swagger已经启动,服务请访问:http://localhost:${3333}/api`);
  });
}
bootstrap();
