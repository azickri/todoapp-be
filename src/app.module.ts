import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Module } from '@nestjs/common';
import { AuthController } from '@/controllers/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.model';
import { AuthService } from './services/auth/auth.service';
import { AuthDatasource } from './services/auth/auth.datasource';
import { TodoModel, TodoSchema } from './models/todo.model';
import { TodoListModel, TodoListSchema } from './models/todo-list.model';
import { TodoController } from './controllers/todo/todo.controller';
import { TodoService } from './services/todo/todo.service';
import { TodoDatasource } from './services/todo/todo.datasource';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeatureAsync([
      {
        name: UserModel.name,
        useFactory: () => UserSchema,
      },
      {
        name: TodoModel.name,
        useFactory: () => {
          const schema = TodoSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
      {
        name: TodoListModel.name,
        useFactory: () => TodoListSchema,
      },
    ]),
  ],
  controllers: [AuthController, TodoController],
  providers: [AuthService, TodoService, AuthDatasource, TodoDatasource],
})
export class AppModule {}
