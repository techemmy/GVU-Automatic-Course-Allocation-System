import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lecturer, LecturerDocument } from './schemas/lecturer.schema';
import { Model } from 'mongoose';
import { CreateLecturerDto } from './dto/create-lecturer.dto';

@Injectable()
export class LecturersService {
  constructor(
    @InjectModel(Lecturer.name) private lecturerModel: Model<Lecturer>,
  ) {}

  async create(
    createLecturerDto: CreateLecturerDto,
  ): Promise<LecturerDocument> {
    const createdLecturer = await this.lecturerModel.create(createLecturerDto);
    return createdLecturer;
  }

  async findAll(): Promise<LecturerDocument[]> {
    const lecturers = await this.lecturerModel
      .find({})
      .populate(['department', 'specialization']);
    return lecturers;
  }

  async delete(id: number): Promise<void> {
    await this.lecturerModel.findByIdAndDelete(id);
  }
}
