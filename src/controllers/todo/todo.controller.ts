import { UserGuard } from '@/guards/user.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BodyAddTodoDto,
  BodyAddTodoItemDto,
  BodyUpdateTodoDto,
  BodyUpdateTodoItemDto,
  ParamIdAndItemIdDto,
  ParamIdDto,
  QueryGetTodoDto,
} from './todo.dto';
import { User } from '@/services/auth/auth.type';
import { TodoService } from '@/services/todo/todo.service';
import {
  ResponseNotFoundTodo,
  ResponseSuccessAddTodo,
  ResponseSuccessGetOneTodo,
  ResponseSuccessGetTodo,
} from './todo.response';

@ApiTags('Todo Controller')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @ApiHeader({ name: 'token' })
  @ApiOkResponse({ type: ResponseSuccessGetTodo })
  @UseGuards(UserGuard)
  getTodo(
    @Query() { page, limit }: QueryGetTodoDto,
    @Req() { user }: { user: User },
  ) {
    return this.todoService.getTodo({ page, limit }, user);
  }

  @Get(':id')
  @ApiHeader({ name: 'token' })
  @ApiOkResponse({ type: ResponseSuccessGetOneTodo })
  @ApiNotFoundResponse({ type: ResponseNotFoundTodo })
  @UseGuards(UserGuard)
  getOneTodo(@Param() { id }: ParamIdDto, @Req() { user }: { user: User }) {
    return this.todoService.getOneTodo(id, user);
  }

  @Post()
  @ApiHeader({ name: 'token' })
  @ApiOkResponse({ type: ResponseSuccessAddTodo })
  @UseGuards(UserGuard)
  addTodo(
    @Body() { title, backgroundColor, items }: BodyAddTodoDto,
    @Req() { user }: { user: User },
  ) {
    return this.todoService.addTodo({ title, backgroundColor, items }, user);
  }

  @Post(':id/item')
  @ApiHeader({ name: 'token' })
  @ApiOkResponse({ type: null, description: 'No Response' })
  @ApiNotFoundResponse({ type: ResponseNotFoundTodo })
  @UseGuards(UserGuard)
  addTodoItem(
    @Param() { id }: ParamIdDto,
    @Body() { items }: BodyAddTodoItemDto,
    @Req() { user }: { user: User },
  ) {
    return this.todoService.addTodoItem({ id, items }, user);
  }

  @Put(':id')
  @ApiHeader({ name: 'token' })
  @ApiOkResponse({ type: null, description: 'No Response' })
  @ApiNotFoundResponse({ type: ResponseNotFoundTodo })
  @UseGuards(UserGuard)
  updateTodo(
    @Param() { id }: ParamIdDto,
    @Body() { title, backgroundColor }: BodyUpdateTodoDto,
    @Req() { user }: { user: User },
  ) {
    return this.todoService.updateTodo({ id, title, backgroundColor }, user);
  }

  @Put(':id/item/:itemId')
  @ApiHeader({ name: 'token' })
  @ApiNotFoundResponse({ type: ResponseNotFoundTodo })
  @UseGuards(UserGuard)
  updateTodoItem(
    @Param() { id, itemId }: ParamIdAndItemIdDto,
    @Body() { isCompleted, value }: BodyUpdateTodoItemDto,
    @Req() { user }: { user: User },
  ) {
    return this.todoService.updateTodoItem(
      { id, itemId, isCompleted, value },
      user,
    );
  }

  @Delete(':id')
  @ApiHeader({ name: 'token' })
  @ApiOkResponse({ type: null, description: 'No Response' })
  @ApiNotFoundResponse({ type: ResponseNotFoundTodo })
  @UseGuards(UserGuard)
  deleteTodo(@Param() { id }: ParamIdDto, @Req() { user }: { user: User }) {
    return this.todoService.deleteTodo(id, user);
  }

  @Delete(':id/item/:itemId')
  @ApiHeader({ name: 'token' })
  @ApiOkResponse({ type: null, description: 'No Response' })
  @ApiNotFoundResponse({ type: ResponseNotFoundTodo })
  @UseGuards(UserGuard)
  deleteTodoItem(
    @Param() { id, itemId }: ParamIdAndItemIdDto,
    @Req() { user }: { user: User },
  ) {
    return this.todoService.deleteTodoItem(id, itemId, user);
  }
}
