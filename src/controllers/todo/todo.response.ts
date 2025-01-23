import { ApiProperty } from '@nestjs/swagger';

class List {
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: Boolean })
  isCompleted: boolean;

  @ApiProperty({ type: String })
  value: string;

  @ApiProperty({ type: String })
  todoId: string;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  __v: number;
}

class Doc {
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  backgroundColor: string;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  __v: number;

  @ApiProperty({ type: [List] })
  items: List[];
}

export class ResponseSuccessGetTodo {
  @ApiProperty({ type: [Doc] })
  docs: Doc[];

  @ApiProperty({ type: Number })
  totalDocs: number;

  @ApiProperty({ type: Number })
  limit: number;

  @ApiProperty({ type: Number })
  totalPages: number;

  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  pagingCounter: number;

  @ApiProperty({ type: Boolean })
  hasPrevPage: boolean;

  @ApiProperty({ type: Boolean })
  hasNextPage: boolean;

  @ApiProperty({ type: String, nullable: true })
  prevPage: string | null;

  @ApiProperty({ type: String, nullable: true })
  nextPage: string | null;
}

export class ResponseSuccessAddTodo {
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  backgroundColor: string;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  __v: number;

  @ApiProperty({ type: [List] })
  items: List[];
}

export class ResponseSuccessGetOneTodo {
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  backgroundColor: string;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  __v: number;

  @ApiProperty({ type: [List] })
  items: List[];
}

export class ResponseNotFoundTodo {
  @ApiProperty({ type: Number, example: 404 })
  statusCode: number;

  @ApiProperty({ type: String, example: 'todo not found' })
  message: string;
}
