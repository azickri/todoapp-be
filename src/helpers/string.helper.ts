import { Types } from 'mongoose';

export class StringHelper {
  static toObjectId(id: any) {
    return new Types.ObjectId(id);
  }
}
