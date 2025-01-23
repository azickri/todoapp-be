import { HttpException, Injectable } from '@nestjs/common';
import { TodoDatasource } from './todo.datasource';
import {
  DataCreateTodo,
  DataCreateTodoList,
  ParamAddTodo,
  ParamAddTodoItem,
  ParamGetTodo,
  ParamUpdateTodo,
  ParamUpdateTodoItem,
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

    const setDataItems: DataCreateTodoList[] = param.items.map((list) => ({
      isCompleted: list.isCompleted,
      value: list.value,
      todoId: StringHelper.toObjectId(newTodo._id),
      userId: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    const newItems = await this.todoDatasource.createItems(setDataItems);

    return {
      _id: newTodo._id,
      ...setDataTodo,
      items: newItems,
    };
  }

  async addTodoItem(param: ParamAddTodoItem, user: User) {
    const todo = await this.todoDatasource.getById(param.id, user);
    if (!todo) {
      throw new HttpException(
        { statusCode: 404, message: 'todo not found' },
        404,
      );
    }

    const setDataItems: DataCreateTodoList[] = param.items.map((list) => ({
      isCompleted: list.isCompleted,
      value: list.value,
      todoId: StringHelper.toObjectId(todo._id),
      userId: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await this.todoDatasource.createItems(setDataItems);
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

  async updateTodoItem(param: ParamUpdateTodoItem, user: User) {
    const [todo, item] = await Promise.all([
      this.todoDatasource.getById(param.id, user),
      this.todoDatasource.getItemById(param.itemId, user),
    ]);

    if (!todo || !item) {
      throw new HttpException(
        { statusCode: 404, message: 'todo not found' },
        404,
      );
    }

    await this.todoDatasource.updateTodoItem(param.itemId, {
      isCompleted: param.isCompleted,
      value: param.value,
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

  async deleteTodoItem(id: string, itemId: string, user: User) {
    const [todo, item] = await Promise.all([
      this.todoDatasource.getById(id, user),
      this.todoDatasource.getItemById(itemId, user),
    ]);

    if (!todo || !item) {
      throw new HttpException(
        { statusCode: 404, message: 'todo not found' },
        404,
      );
    }

    await this.todoDatasource.deleteItemById(itemId);
  }
}
