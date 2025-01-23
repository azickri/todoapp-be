import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BodyLoginDto, BodyRegisterDto } from './auth.dto';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  // constructor() {}

  @Post('login')
  login(@Body() { email, password }: BodyLoginDto) {
    //
  }

  @Post('register')
  register(@Body() { name, email, password }: BodyRegisterDto) {
    //
  }
}
