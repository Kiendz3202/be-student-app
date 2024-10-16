import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { UsersService } from "../services/users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Teacher } from "../entities/teacher.entity";
import { Student } from "../entities/student.entity";
import { Class } from "../entities/class.entity";
import { StudyMaterial } from "../entities/study-material.entity";
import { Assignment } from "../entities/assignment.entity";

@Controller("assignment")
export class AssignmentController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>
  ) {}

  @Get(":id")
  //   http://localhost:3000/assignment/1
  //get all assignments of a class
  async getAllOfClass(@Param("id") id: number) {
    const classEntity = await this.classRepository.findOne({
      where: { id },
      relations: {
        assignments: true,
      },
    });
    return {
      statusCode: 200,
      data: classEntity?.assignments || [],
    };
  }

  @Get("/detail/:id")
  async getDetailAssignmentClass(@Param("id") id: number) {
    const assignmentEntity = await this.assignmentRepository.findOne({
      where: { id },
    });
    return {
      statusCode: 200,
      data: assignmentEntity,
    };
  }

  @Post()
  //teacher create
  async createAssignment(@Param("id") idClass: number, @Body() body: any) {
    const classEntity = await this.classRepository.findOne({
      where: { id: idClass },
    });

    const assignment = await this.assignmentRepository.create({
      ...body,
      class: classEntity,
    });

    const assignmentCreated = await this.assignmentRepository.save(assignment);

    return {
      statusCode: 200,
      data: assignmentCreated,
    };
  }

  @Post("update")
  //teacher update
  async updateAssignment(@Param("id") id: number, @Body() body: any) {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
    });

    Object.assign(assignment, body);

    const assignmentUpdated = await this.assignmentRepository.save(assignment);

    return {
      statusCode: 200,
      data: assignmentUpdated,
    };
  }

  @Post("delete/:id")
  async deleteAssignment(@Param("id") id: number) {
    await this.assignmentRepository.delete({ id });
    return {
      statusCode: 200,
    };
  }
}
