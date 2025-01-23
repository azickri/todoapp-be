import { UserDocument, UserModel } from '@/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthDatasource {
  constructor(@InjectModel(UserModel.name) private userModel: UserDocument) {}
}
