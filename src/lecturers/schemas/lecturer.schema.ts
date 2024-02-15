import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Department } from 'src/departments/schemas/department.schema';
import mongoose from 'mongoose';

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

  @Prop()
  available: boolean;

  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department: Department;
}

export const lecturerSchema = SchemaFactory.createForClass(Lecturer);
