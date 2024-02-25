import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Course } from 'src/courses/schemas/course.schema';
import { Lecturer } from 'src/lecturers/schemas/lecturer.schema';

export type CourseLecturerAllocationDocument =
  HydratedDocument<CourseLecturerAllocation>;

@Schema()
export class CourseLecturerAllocation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Course.name })
  course: Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Lecturer.name })
  lecturer: Lecturer;

  @Prop()
  sessionYear: number;
}

export const courseLecturerAllocationSchema = SchemaFactory.createForClass(
  CourseLecturerAllocation,
);
