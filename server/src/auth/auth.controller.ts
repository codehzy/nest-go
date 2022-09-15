import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginFormType } from './types/UserInfo';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('用户认证模块')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 登录-JWT
  @Post('/login')
  @ApiOperation({
    summary: '用户登录',
  })
  async login(@Body() loginForm: LoginFormType) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginForm);
    console.log(authResult);

    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.data.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码错误`,
        };
      default:
        return {
          code: 600,
          msg: `未知错误`,
        };
    }
  }
}
