import { Types } from 'mongoose';

export type ParamGetTodo = {
  page: number;
  limit: number;
};

export type ParamAddTodo = {
  title: string;
  backgroundColor: string;
  items: {
    isCompleted: boolean;
    value: string;
  }[];
};

export type ParamAddTodoItem = {
  id: string;
  items: {
    isCompleted: boolean;
    value: string;
  }[];
};

export type ParamUpdateTodo = {
  id: string;
  title: string;
  backgroundColor: string;
};

export type ParamUpdateTodoItem = {
  id: string;
  itemId: string;
  isCompleted: boolean;
  value: string;
};

export type DataCreateTodo = {
  title: string;
  backgroundColor: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type DataCreateTodoList = {
  isCompleted: boolean;
  value: string;
  todoId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type DataUpdateTodo = {
  title: string;
  backgroundColor: string;
  updatedAt: Date;
};

export type DataUpdateTodoItem = {
  isCompleted: boolean;
  value: string;
  updatedAt: Date;
};
