import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './types/UserType';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户操作')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 查找所有用户
  @Get('/findAll')
  @ApiOperation({
    summary: '查找所有用户',
  })
  getAllUser(): Promise<any | undefined> {
    return this.userService.findAll();
  }

  // 注册用户
  @Post('/register')
  @ApiOperation({
    summary: '注册用户',
  })
  createUser(@Body() body: CreateUserDto): Promise<any | undefined> {
    return this.userService.createOne(body);
  }

  // 更新某个用户
  @Put('/updateOne')
  @ApiOperation({
    summary: '更新某个用户',
  })
  updateUser(@Body() body: CreateUserDto): Promise<any | undefined> {
    return this.userService.updateUser(body);
  }

  // 删除某个用户
  @Delete('/deleteOne')
  @ApiOperation({
    summary: '删除某个用户',
  })
  deleteUser(@Body() body: { email: string }): Promise<any | undefined> {
    return this.userService.deleteUser(body);
  }

  // 查询用户信息
  @Post('/findUser')
  @ApiOperation({
    summary: '查询用户信息',
  })
  findUser(@Body() body: { email: string }): Promise<any | undefined> {
    return this.userService.findOne(body.email);
  }
}
