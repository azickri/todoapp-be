import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TodoItemDocument = TodoItemModel & Document;

@Schema({ collection: 'todo-items' })
export class TodoItemModel {
  @Prop({ type: Boolean })
  isCompleted: boolean;

  @Prop({ type: String })
  value: string;

  @Prop({ type: Types.ObjectId })
  todoId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItemModel);
TodoItemSchema.index({ todoId: 1, userId: 1 });
