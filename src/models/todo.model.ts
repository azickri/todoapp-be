import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TodoDocument = TodoModel & Document;

@Schema({ collection: 'todos' })
export class TodoModel {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  backgroundColor: string;

  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(TodoModel);
TodoSchema.index({ userId: 1 });
TodoSchema.index({ userId: 1, title: 1 });
