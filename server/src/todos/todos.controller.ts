import {Body, Controller, Get, Post} from '@nestjs/common';
import {TodosService} from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {
    }

    // 查询某一个todo
    @Post('/findOne')
    getOneTodo(@Body() body: { title: string }): Promise<any | undefined> {
        return this.todosService.findOne(body.title)
    }
}
