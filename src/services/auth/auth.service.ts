import { HttpException, Injectable } from '@nestjs/common';
import { DataCreateUser, ParamLogin, ParamRegister } from './auth.type';
import { AuthDatasource } from './auth.datasource';
import { CryptHelper } from '@/helpers/crypt.helper';

@Injectable()
export class AuthService {
  constructor(private authDatasource: AuthDatasource) {}

  async login(param: ParamLogin) {
    const { email, password } = param;

    const user = await this.authDatasource.getByEmail(email);
    if (!user) {
      throw new HttpException(
        { statusCode: 404, message: 'user not found' },
        404,
      );
    }

    const isMatch = await CryptHelper.compareBcrypt(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        { statusCode: 401, message: 'password not match' },
        401,
      );
    }

    delete user.password;
    return {
      ...user.toObject(),
      token: CryptHelper.encryptString(String(user._id)),
    };
  }

  async register(param: ParamRegister) {
    const currentUser = await this.authDatasource.getByEmail(param.email);
    if (currentUser) {
      throw new HttpException(
        { statusCode: 403, message: 'email has registered' },
        403,
      );
    }

    const setData: DataCreateUser = {
      name: param.name,
      email: param.email,
      password: await CryptHelper.hashBcrypt(param.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newUser = await this.authDatasource.create(setData);

    delete setData.password;
    return {
      _id: newUser._id,
      token: CryptHelper.encryptString(String(newUser._id)),
      ...setData,
    };
  }
}
