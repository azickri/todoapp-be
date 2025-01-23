import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BodyLoginDto, BodyRegisterDto } from './auth.dto';
import { AuthService } from '@/services/auth/auth.service';
import {
  ResponseForbiddenRegister,
  ResponseNotFoundLogin,
  ResponseSuccessLogin,
  ResponseSuccessRegister,
  ResponseUnauthorizedLogin,
} from './auth.response';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: ResponseSuccessLogin })
  @ApiNotFoundResponse({ type: ResponseNotFoundLogin })
  @ApiUnauthorizedResponse({ type: ResponseUnauthorizedLogin })
  login(@Body() { email, password }: BodyLoginDto) {
    return this.authService.login({ email, password });
  }

  @Post('register')
  @ApiOkResponse({ type: ResponseSuccessRegister })
  @ApiForbiddenResponse({ type: ResponseForbiddenRegister })
  register(@Body() { name, email, password }: BodyRegisterDto) {
    return this.authService.register({ name, email, password });
  }
}
