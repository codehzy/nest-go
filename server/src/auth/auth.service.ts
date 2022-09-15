import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/types/UserType';
import { UserService } from 'src/user/user.service';
import { encryptPassword } from 'src/utils/cryptogram';
import { JwtService } from '@nestjs/jwt';
import { LoginFormType, UserInfoType } from './types/UserInfo';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginForm: LoginFormType): Promise<any> {
    const { email, password, repassword } = loginForm;

    if (password !== repassword) {
      return {
        code: 600,
        data: {
          message: '两次密码不一致',
        },
      };
    }

    // 查询用户信息
    const {
      data: { user },
    } = (await this.usersService.findOne(email)) as {
      code: number;
      data: {
        user: UserInfoType;
      };
    };

    if (!user) {
      return {
        code: 600,
        data: {
          message: '用户不存在',
        },
      };
    }

    const hashedPassword = user.password;
    const salt = user.salt;

    // 通过密码盐，加密传参，再对数据库中密码比较，判断是否相等
    if (hashedPassword === encryptPassword(password, salt)) {
      // 密码正确
      return {
        code: 1,
        data: {
          message: '登录成功',
          user: {
            username: user.username,
            email: user.email,
            password: user.password,
          },
        },
      };
    } else {
      // 密码错误
      return {
        code: 2,
        user: '用户名或者密码错误',
      };
    }
  }

  async certificate(user: CreateUserDto) {
    const payload = {
      email: user.email,
      password: user.password,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');

    const token = this.jwtService.sign(payload);
    return {
      code: 200,
      data: {
        token,
      },
      message: '登录成功',
    };
  }
}
