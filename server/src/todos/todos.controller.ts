import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodosService } from './todos.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('todos')
@ApiTags('TODOList')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // 查询某一个todo
  @Post('/findOne')
  @ApiOperation({
    summary: '查询某一个todo',
  })
  getOneTodo(@Body() body: { title: string }): Promise<any | undefined> {
    return this.todosService.findOne(body.title);
  }

  // 查询所有todo
  @UseGuards(AuthGuard('jwt'))
  @Get('/findAll')
  @ApiOperation({
    summary: '查询所有todo',
  })
  getAllTodo(): Promise<any | undefined> {
    return this.todosService.findAll();
  }

  // 添加todo
  @Post('/createOne')
  @ApiOperation({
    summary: '添加todo',
  })
  addTodo(
    @Body() body: { title: string; description: string; status: number },
  ): Promise<any | undefined> {
    return this.todosService.createOne(
      body.title,
      body.description,
      body.status,
    );
  }

  // 更新todo
  @Put('/updateOne')
  @ApiOperation({
    summary: '更新todo',
  })
  updateOne(
    @Body() body: { title: string; description: string; status: number },
  ): Promise<any | undefined> {
    return this.todosService.updateOne(
      body.title,
      body.description,
      body.status,
    );
  }

  // 删除todo
  @Delete('/deleteOne')
  deleteOne(@Body() body: { title: string }): Promise<any | undefined> {
    return this.todosService.deleteOne(body.title);
  }
}
