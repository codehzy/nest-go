import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // 查询某一个todo
  @Post('/findOne')
  getOneTodo(@Body() body: { title: string }): Promise<any | undefined> {
    return this.todosService.findOne(body.title);
  }

  // 查询所有todo
  @Get('/findAll')
  getAllTodo(): Promise<any | undefined> {
    return this.todosService.findAll();
  }

  // 添加todo
  @Post('/createOne')
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
