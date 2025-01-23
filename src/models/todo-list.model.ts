import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TodoListDocument = TodoListModel & Document;

@Schema({ collection: 'todo-lists' })
export class TodoListModel {
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

export const TodoListSchema = SchemaFactory.createForClass(TodoListModel);
TodoListSchema.index({ todoId: 1, userId: 1 });
