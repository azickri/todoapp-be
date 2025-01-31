import { TodoDocument, TodoModel } from '@/models/todo.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, Types } from 'mongoose';
import {
  DataCreateTodo,
  DataCreateTodoList,
  DataUpdateTodo,
  DataUpdateTodoItem,
  ParamGetTodo,
} from './todo.type';
import { User } from '../auth/auth.type';
import { TodoItemDocument, TodoItemModel } from '@/models/todo-item';

@Injectable()
export class TodoDatasource {
  constructor(
    @InjectModel(TodoModel.name)
    private todoModel: Model<TodoDocument> & PaginateModel<TodoDocument>,
    @InjectModel(TodoItemModel.name)
    private todoItemModel: Model<TodoItemDocument>,
  ) {}

  async get(param: ParamGetTodo, user: User) {
    const filter = { userId: user._id };
    const options = {
      page: param.page,
      limit: param.limit,
      sort: { createdAt: -1 },
    };

    const promises = [];
    const request = await this.todoModel.paginate(filter, options);

    for (const doc of request.docs) {
      const promise = new Promise(async (resolve) => {
        const lists = await this.todoItemModel.find({
          todoId: doc._id,
          userId: doc.userId,
        });

        resolve({ ...doc.toObject(), lists });
      });

      promises.push(promise);
    }

    request.docs = await Promise.all(promises);
    return request;
  }

  async getById(id: string, user: User) {
    return await this.todoModel.findOne({
      _id: new Types.ObjectId(id),
      userId: user._id,
    });
  }

  async getItemById(id: string, user: User) {
    return await this.todoItemModel.findOne({
      _id: new Types.ObjectId(id),
      userId: user._id,
    });
  }

  async getOne(id: string, user: User) {
    const todo = await this.todoModel.findOne({
      _id: new Types.ObjectId(id),
      userId: user._id,
    });

    if (!todo) return;

    const lists = await this.todoItemModel.find({
      todoId: todo._id,
      userId: user._id,
    });

    return {
      ...todo.toObject(),
      lists,
    };
  }

  async create(data: DataCreateTodo) {
    return await this.todoModel.create(data);
  }

  async createItems(datas: DataCreateTodoList[]) {
    return await this.todoItemModel.insertMany(datas);
  }

  async update(id: string, data: DataUpdateTodo) {
    await this.todoModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: data },
    );
  }

  async updateTodoItem(id: string, data: DataUpdateTodoItem) {
    await this.todoItemModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: data },
    );
  }

  async deleteById(id: string) {
    await this.todoModel.deleteOne({ _id: new Types.ObjectId(id) });
    await this.todoItemModel.deleteMany({ todoId: new Types.ObjectId(id) });
  }

  async deleteItemById(id: string) {
    await this.todoItemModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
