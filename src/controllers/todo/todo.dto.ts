import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class QueryGetTodoDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  page: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  limit: number;
}

export class ParamIdDto {
  @MinLength(24)
  @MaxLength(24)
  @ApiProperty({ type: String })
  id: string;
}

class TodoItem {
  @ApiProperty({ type: Boolean })
  isCompleted: boolean;

  @ApiProperty({ type: String })
  value: string;
}

export class BodyAddTodoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  backgroundColor: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: [TodoItem] })
  items: TodoItem[];
}

export class BodyUpdateTodoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  backgroundColor: string;
}
