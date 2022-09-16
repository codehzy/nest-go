import { Injectable } from '@nestjs/common';
import { bookInfoType } from './types/bookInfoType';
import sequelize from '../database/sequelize';
import * as Sequelize from 'sequelize';

@Injectable()
export class FileService {
  async createBook(bookInfo: bookInfoType) {
    // 插入文件
    const sql = `INSERT INTO books (name, url, lastUpdateTime) VALUES ('${bookInfo.name}', '${bookInfo.url}', '${bookInfo.lastUpdateTime}')`;

    try {
      await sequelize.query(sql, {
        type: Sequelize.QueryTypes.INSERT,
        raw: true,
        logging: false,
      });

      return {
        code: 200,
        data: {
          msg: 'success',
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 503,
        msg: '数据库插入错误',
      };
    }
  }
}
