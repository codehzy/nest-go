import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join, normalize } from 'path';
import * as OSS from 'ali-oss';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { bookInfoType } from './types/bookInfoType';
import utf8 from 'utf8';

@Controller('file')
export class FileController {
  oss: OSS;
  constructor(private readonly fileService: FileService) {
    this.oss = new OSS({
      region: 'oss-cn-hangzhou', //下面的值需要你自己去获取
      accessKeyId: 'LTAI5tBferFEBj3ZMCAQ36gR',
      accessKeySecret: 'n5Ha4RkcBJlNCy0GXhLWPC80hXziYt',
      bucket: 'bookinfinity',
    });
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: file.filename,
      path: file.path,
      size: file.size, // 路径请结合前面的main多静态目录来实现
    };
  }

  @Post('/upload-oss')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '../../', '/upload-oos'),
        filename: (req, file, cb) => {
          const filename = file.originalname;

          return cb(null, filename);
        },
      }),
    }),
  )
  async oos(@UploadedFile() file: Express.Multer.File) {
    // 上传的时候我们运行你上传到内存中 然后发送给第三方但是这样做不好，
    // 如果存储文件太多或者并非量 你的机器会撑不住，因此我们建议的做法是先存到某
    // 临时目录，然后调用第三方去upload 最后由定时job删除这个up目录就好了
    // 主要还是文件的上传和下载 上传比较简单
    const value = await this.oss.put(file.filename, normalize(file.path));
    console.log(value);

    const {
      name,
      url,
      res: {
        status,
        headers: { date },
      },
    } = value;
    if (status === 200) {
      const bookInfo = {
        name: name.split('.')[0],
        url,
        lastUpdateTime: date,
      };
      console.log(bookInfo);

      const res = await this.createBook(bookInfo);

      return {
        code: 200,
        data: {
          data: res,
        },
      };
    }
  }

  @Post('/create')
  async createBook(
    @Body()
    postData: bookInfoType,
  ) {
    const { name, url, lastUpdateTime } = postData;

    return this.fileService.createBook({
      name,
      url,
      lastUpdateTime,
    });
  }
}
