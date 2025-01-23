import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QueryGetTodoDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  page: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  limit: number;

  @ApiProperty({ type: String, required: false })
  search?: string;
}
