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
  BodyUpdateTodoDto,
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

  @Put(':id')
  @ApiHeader({ name: 'token' })
  @ApiOkResponse({ type: null })
  @ApiNotFoundResponse({ type: ResponseNotFoundTodo })
  @UseGuards(UserGuard)
  updateTodo(
    @Param() { id }: ParamIdDto,
    @Body() { title, backgroundColor }: BodyUpdateTodoDto,
    @Req() { user }: { user: User },
  ) {
    return this.todoService.updateTodo({ id, title, backgroundColor }, user);
  }

  @Delete(':id')
  @ApiHeader({ name: 'token' })
  @ApiOkResponse({ type: null })
  @ApiNotFoundResponse({ type: ResponseNotFoundTodo })
  @UseGuards(UserGuard)
  deleteTodo(@Param() { id }: ParamIdDto, @Req() { user }: { user: User }) {
    return this.todoService.deleteTodo(id, user);
  }
}
