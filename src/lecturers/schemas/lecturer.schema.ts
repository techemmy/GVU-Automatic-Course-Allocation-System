import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LecturerDocument = HydratedDocument<Lecturer>;

@Schema()
export class Lecturer {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  dateOfBirth: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  staffNo: string;

  @Prop()
  availabile: boolean;
}

export const lecturerSchema = SchemaFactory.createForClass(Lecturer);
