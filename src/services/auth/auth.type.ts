import { Types } from 'mongoose';

export type ParamLogin = {
  email: string;
  password: string;
};

export type ParamRegister = {
  name: string;
  email: string;
  password: string;
};

export type DataCreateUser = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
