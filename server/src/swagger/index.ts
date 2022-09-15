import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
  .setTitle('nestJS9.0')
  .setDescription('nestJS9.0')
  .setVersion('1.0')
  .addTag('nestJS9.0')
  .addBasicAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'jwt',
  )
  .build();

export function createSwagger(app) {
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api', app, document);
}
