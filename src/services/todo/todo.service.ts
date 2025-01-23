import { HttpException, Injectable } from '@nestjs/common';
import { TodoDatasource } from './todo.datasource';
import {
  DataCreateTodo,
  DataCreateTodoList,
  ParamAddTodo,
  ParamGetTodo,
  ParamUpdateTodo,
} from './todo.type';
import { User } from '../auth/auth.type';
import { StringHelper } from '@/helpers/string.helper';

@Injectable()
export class TodoService {
  constructor(private todoDatasource: TodoDatasource) {}

  async getTodo(param: ParamGetTodo, user: User) {
    return this.todoDatasource.get(param, user);
  }

  async getOneTodo(id: string, user: User) {
    return this.todoDatasource.getOne(id, user);
  }

  async addTodo(param: ParamAddTodo, user: User) {
    const setDataTodo: DataCreateTodo = {
      title: param.title,
      backgroundColor: param.backgroundColor,
      userId: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newTodo = await this.todoDatasource.create(setDataTodo);

    const setDataTodoLists: DataCreateTodoList[] = param.items.map((list) => ({
      isCompleted: list.isCompleted,
      value: list.value,
      todoId: StringHelper.toObjectId(newTodo._id),
      userId: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    const newTodoLists = await this.todoDatasource.createList(setDataTodoLists);

    return {
      _id: newTodo._id,
      ...setDataTodo,
      items: newTodoLists,
    };
  }

  async updateTodo(param: ParamUpdateTodo, user: User) {
    const todo = await this.todoDatasource.getById(param.id, user);
    if (!todo) {
      throw new HttpException(
        { statusCode: 404, message: 'todo not found' },
        404,
      );
    }

    await this.todoDatasource.update(param.id, {
      title: param.title,
      backgroundColor: param.backgroundColor,
      updatedAt: new Date(),
    });
  }

  async deleteTodo(id: string, user: User) {
    const todo = await this.todoDatasource.getById(id, user);
    if (!todo) {
      throw new HttpException(
        { statusCode: 404, message: 'todo not found' },
        404,
      );
    }

    await this.todoDatasource.deleteById(id);
  }
}
