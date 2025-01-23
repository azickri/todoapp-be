import { TodoDocument, TodoModel } from '@/models/todo.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, Types } from 'mongoose';
import {
  DataCreateTodo,
  DataCreateTodoList,
  DataUpdateTodo,
  ParamGetTodo,
} from './todo.type';
import { User } from '../auth/auth.type';
import { TodoListDocument, TodoListModel } from '@/models/todo-list.model';

@Injectable()
export class TodoDatasource {
  constructor(
    @InjectModel(TodoModel.name)
    private todoModel: Model<TodoDocument> & PaginateModel<TodoDocument>,
    @InjectModel(TodoListModel.name)
    private todoListModel: Model<TodoListDocument>,
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
        const lists = await this.todoListModel.find({
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

  async getOne(id: string, user: User) {
    const todo = await this.todoModel.findOne({
      _id: new Types.ObjectId(id),
      userId: user._id,
    });

    if (!todo) return;

    const lists = await this.todoListModel.find({
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

  async createList(datas: DataCreateTodoList[]) {
    return await this.todoListModel.insertMany(datas);
  }

  async update(id: string, data: DataUpdateTodo) {
    await this.todoModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: data },
    );
  }

  async deleteById(id: string) {
    await this.todoModel.deleteOne({ _id: new Types.ObjectId(id) });
    await this.todoListModel.deleteMany({ todoId: new Types.ObjectId(id) });
  }
}
