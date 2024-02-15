import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from './schemas/department.schema';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const newDepartment =
      await this.departmentModel.create(createDepartmentDto);
    return newDepartment;
  }

  async findAll(): Promise<Department[]> {
    const allDepartments = await this.departmentModel.find({});
    return allDepartments;
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentModel.findById(id);
    return department;
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<void> {
    await this.departmentModel.findByIdAndUpdate(id, updateDepartmentDto);
  }

  async remove(id: number): Promise<void> {
    await this.departmentModel.findByIdAndDelete(id);
  }
}
