import { CryptHelper } from '@/helpers/crypt.helper';
import { AuthDatasource } from '@/services/auth/auth.datasource';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authDatasource: AuthDatasource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { headers } = context.switchToHttp().getRequest<Request>();

      const token = headers.token;
      if (!token) throw 'no token';

      const userId = CryptHelper.decryptString(String(token));
      const user = await this.authDatasource.getById(userId);
      if (!user) throw 'no user';

      delete user.password;

      context.switchToHttp().getRequest().user = user;

      return true;
    } catch {
      throw new HttpException({ statusCode: 401, message: 'unauthorize' }, 401);
    }
  }
}
