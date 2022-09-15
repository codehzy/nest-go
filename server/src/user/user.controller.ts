import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginFormType } from 'src/auth/types/UserInfo';
import { CreateUserDto } from './types/UserType';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // 查找所有用户
  @Get('/findAll')
  getAllUser(): Promise<any | undefined> {
    return this.userService.findAll();
  }

  // 注册用户
  @Post('/register')
  createUser(@Body() body: CreateUserDto): Promise<any | undefined> {
    return this.userService.createOne(body);
  }

  // 更新某个用户
  @Put('/updateOne')
  updateUser(@Body() body: CreateUserDto): Promise<any | undefined> {
    return this.userService.updateUser(body);
  }

  // 删除某个用户
  @Delete('/deleteOne')
  deleteUser(@Body() body: { email: string }): Promise<any | undefined> {
    return this.userService.deleteUser(body);
  }

  // 查询用户信息
  @Post('/findUser')
  findUser(@Body() body: { email: string }): Promise<any | undefined> {
    return this.userService.findOne(body.email);
  }
}
