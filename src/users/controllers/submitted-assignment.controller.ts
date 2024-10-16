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
import { SubmittedAssignment } from "../entities/submitted-assignment.entity";

@Controller("submitted-assignment")
export class SubmittedAssignmentController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(SubmittedAssignment)
    private readonly submittedAssignmentRepository: Repository<SubmittedAssignment>
  ) {}

  @Get(":id")
  //   http://localhost:3000/submitted-assignment/1
  //get all submitted assignments of a assignment
  async getAllOfClass(@Param("id") idAssignment: number) {
    const assignment = await this.assignmentRepository.findOne({
      where: { id: idAssignment },
      relations: {
        submittedAssignments: true,
      },
    });
    return {
      statusCode: 200,
      data: assignment?.submittedAssignments || [],
    };
  }

  @Get("/detail/:id")
  async getDetailSubmittedAssignment(@Param("id") id: number) {
    const assignmentEntity = await this.submittedAssignmentRepository.findOne({
      where: { id },
    });
    return {
      statusCode: 200,
      data: assignmentEntity,
    };
  }

  @Post()
  //student create
  async createAssignment(
    @Param("idAssignment") idAssignment: number,
    @Param("idStudent") idStudent: number,
    @Body() body: any
  ) {
    const assignment = await this.assignmentRepository.findOne({
      where: { id: idAssignment },
    });
    const student = await this.studentRepository.findOne({
      where: { id: idStudent },
    });

    const submittedAssignment = await this.submittedAssignmentRepository.create(
      {
        ...body,
        assignment,
        student,
      }
    );

    const submittedAssignmentCreated =
      await this.submittedAssignmentRepository.save(submittedAssignment);

    return {
      statusCode: 200,
      data: submittedAssignmentCreated,
    };
  }

  @Post("student/update")
  //student update(not update score)
  async updateSubmittedAssignment(@Param("id") id: number, @Body() body: any) {
    const submittedAssignment =
      await this.submittedAssignmentRepository.findOne({
        where: { id },
      });

    Object.assign(submittedAssignment, body);

    const submittedAssignmentUpdated =
      await this.submittedAssignmentRepository.save(submittedAssignment);

    return {
      statusCode: 200,
      data: submittedAssignmentUpdated,
    };
  }

  @Post("teacher/update")
  //student update(not update score)
  async updateScoreSubmittedAssignment(
    @Param("id") id: number,
    @Body() body: any
  ) {
    const submittedAssignment =
      await this.submittedAssignmentRepository.findOne({
        where: { id },
      });

    Object.assign(submittedAssignment, body);

    const submittedAssignmentUpdated =
      await this.submittedAssignmentRepository.save(submittedAssignment);

    return {
      statusCode: 200,
      data: submittedAssignmentUpdated,
    };
  }

  @Post("delete/:id")
  //student delete
  async deleteAssignment(@Param("id") id: number) {
    await this.submittedAssignmentRepository.delete({ id });
    return {
      statusCode: 200,
    };
  }
}
