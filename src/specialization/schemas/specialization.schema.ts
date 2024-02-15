import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SpecializationDocument = HydratedDocument<Specialization>;

@Schema()
export class Specialization {
  @Prop({ required: true })
  name: string;
}

export const specializationSchema =
  SchemaFactory.createForClass(Specialization);
