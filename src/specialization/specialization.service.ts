import { Injectable } from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Specialization,
  SpecializationDocument,
} from './schemas/specialization.schema';
import { Model } from 'mongoose';

@Injectable()
export class SpecializationService {
  constructor(
    @InjectModel(Specialization.name)
    private specializationModel: Model<Specialization>,
  ) {}

  async create(
    createSpecializationDto: CreateSpecializationDto,
  ): Promise<SpecializationDocument> {
    const newSpecialization = await this.specializationModel.create(
      createSpecializationDto,
    );
    return newSpecialization;
  }

  async findAll(): Promise<SpecializationDocument[]> {
    const allSpecializations = await this.specializationModel.find();
    return allSpecializations;
  }

  async findOne(id: string): Promise<SpecializationDocument> {
    const specialization = await this.specializationModel.findById(id);
    return specialization;
  }

  async update(id: number, updateSpecializationDto: UpdateSpecializationDto) {
    await this.specializationModel.findByIdAndUpdate(
      id,
      updateSpecializationDto,
    );
  }

  async remove(id: number) {
    await this.specializationModel.findByIdAndDelete(id);
  }
}
