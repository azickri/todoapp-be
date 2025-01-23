import { ApiProperty } from '@nestjs/swagger';

export class ResponseSuccessLogin {
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  token: string;
}

export class ResponseNotFoundLogin {
  @ApiProperty({ type: Number, example: 404 })
  statusCode: number;

  @ApiProperty({ type: String, example: 'user not found' })
  message: string;
}

export class ResponseUnauthorizedLogin {
  @ApiProperty({ type: Number, example: 403 })
  statusCode: number;

  @ApiProperty({ type: String, example: 'password not match' })
  message: string;
}

export class ResponseSuccessRegister {
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  token: string;
}

export class ResponseForbiddenRegister {
  @ApiProperty({ type: Number, example: 403 })
  statusCode: number;

  @ApiProperty({ type: String, example: 'email has registered' })
  message: string;
}
