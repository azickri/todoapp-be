import { Injectable } from '@nestjs/common';
import { ParamLogin, ParamRegister } from './auth.type';

@Injectable()
export class AuthService {
  // constructor() {}

  async login(param: ParamLogin) {
    //
  }

  async register(param: ParamRegister) {
    //
  }
}
