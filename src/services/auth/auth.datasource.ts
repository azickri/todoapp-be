import { UserDocument, UserModel } from '@/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataCreateUser } from './auth.type';

@Injectable()
export class AuthDatasource {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {}

  async getById(id: string) {
    return await this.userModel.findById(id);
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async create(data: DataCreateUser) {
    return await this.userModel.create(data);
  }
}
