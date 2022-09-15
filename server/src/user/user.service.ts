import { Injectable } from '@nestjs/common';
import sequelize from '../database/sequelize';
import * as Sequelize from 'sequelize';
import { CreateUserDto } from './types/UserType';
import { v4 as uuidv4 } from 'uuid';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { LoginFormType, UserInfoType } from 'src/auth/types/UserInfo';

@Injectable()
export class UserService {
  // 查找所有用户
  async findAll(): Promise<any | undefined> {
    const sql = `SELECT * from users`;

    try {
      const allUser = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否打印sql语句
      });

      return {
        code: 200,
        data: {
          allUser,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 注册用户
   * @param createUserDto 注册用户的信息
   */
  async createOne(createUserDto: CreateUserDto): Promise<any | undefined> {
    // 根据邮箱查找用户是否存在
    const sql = `SELECT * from users where email = '${createUserDto.email}'`;

    const userExist = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT, // 查询方式
      raw: true, // 是否使用数组组装的方式展示结果
      logging: false, // 是否打印sql语句
    });

    if (userExist.length) {
      return {
        code: 350,
        data: {
          message: '用户已经存在',
        },
      };
    }

    const uid = uuidv4();

    const { password, repassword } = createUserDto;

    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }

    // 加盐加密
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);

    Object.keys(createUserDto).forEach((item) => {
      if (item === 'password') createUserDto[item] = hashPwd;
    });
    const status = 0;

    const finalReqBody = Object.assign({ uid, salt, status }, createUserDto);

    // 新建用户
    const sqlOne = `INSERT INTO users (uid, email, username, password, phone, salt, status) VALUES ('${finalReqBody.uid}', '${finalReqBody.email}', '${finalReqBody.username}', '${finalReqBody.password}', '${finalReqBody.phone}', '${finalReqBody.salt}','${status}')`;
    try {
      await sequelize.query(sqlOne, {
        type: Sequelize.QueryTypes.INSERT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否打印sql语句
      });

      return {
        code: 200,
        data: {
          message: '注册成功',
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 更新用户信息
   * @param updateUserDto 更新用户
   * @returns
   */
  async updateUser(updateUserDto: CreateUserDto): Promise<any | undefined> {
    const { email, username, phone, password, repassword } = updateUserDto;

    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }

    // 加盐加密
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    // 更新用户信息
    const sql = `UPDATE users SET email = '${email}', username = '${username}', phone = '${phone}', password = '${hashPwd}', salt = '${salt}' WHERE email = '${email}'`;

    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.UPDATE, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否打印sql语句s
      });

      if (res) {
        return {
          code: 200,
          message: '更新成功',
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 根据用户邮箱删除用户
   * @param param0 用户邮箱
   */
  async deleteUser({ email }: { email: string }): Promise<any | undefined> {
    // 根据用户邮箱删除用户
    const sql = `DELETE FROM users WHERE email = '${email}'`;
    // 根据用户邮箱查找用户
    const sqlOne = `SELECT * from users where email = '${email}'`;
    const res = await sequelize.query(sqlOne, {
      type: Sequelize.QueryTypes.SELECT, // 查询方式
      raw: true, // 是否使用数组组装的方式展示结果
      logging: false, // 是否打印sql语句
    });

    if (res.length === 0) {
      return {
        code: 600,
        message: '用户不存在',
      };
    }

    try {
      await sequelize.query(sql, {
        type: Sequelize.QueryTypes.DELETE, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: false, // 是否打印sql语句
      });

      return {
        code: 200,
        message: '删除成功',
      };
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 根据邮箱获取用户信息
   * @param email 邮箱
   * @returns
   */
  async findOne(email: string): Promise<any | undefined> {
    // 根据用户邮箱查找用户
    const sql = `SELECT username,password,email,phone,salt from users where email = '${email}'`;
    const res = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT, // 查询方式
      raw: true, // 是否使用数组组装的方式展示结果
      logging: false, // 是否打印sql语句
    });

    if (res.length === 0) {
      return {
        code: 600,
        data: {
          message: '用户不存在',
        },
      };
    }

    return {
      code: 200,
      data: {
        user: res[0],
      },
    };
  }

  /**
   * 用户登录
   * @param loginForm 登录表单
   * @returns
   */
  // async loginUser(loginForm: LoginFormType) {
  //   console.log('JWT验证 - Step 1: 用户请求登录');
  //   const authResult = await this.authService.validateUser(loginForm);
  // }
}
