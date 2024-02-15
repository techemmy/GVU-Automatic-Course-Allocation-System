import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DepartmentDocument = HydratedDocument<Department>;

@Schema()
export class Department {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ required: true })
  maximumLevel: number;
}

export const departmentSchema = SchemaFactory.createForClass(Department);
