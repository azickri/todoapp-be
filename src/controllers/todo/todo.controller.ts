import { UserGuard } from '@/guards/user.guard';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { QueryGetTodoDto } from './todo.dto';
import { User } from '@/services/auth/auth.type';

@ApiTags('Todo Controller')
@Controller('todo')
export class TodoController {
  // constructor() {}

  @Get()
  @ApiHeader({ name: 'token' })
  @UseGuards(UserGuard)
  getTodo(
    @Query() { page, limit, search }: QueryGetTodoDto,
    @Req() { user }: { user: User },
  ) {
    //
  }
}
