import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // 当然了你可以使用 config可以sync的方法去配置它
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: join(__dirname, '../../', '/upload'),
          filename: (req, file, cb) => {
            const filename = file.originalname;

            return cb(null, filename);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
