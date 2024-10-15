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

@Controller("study-material")
export class StudyMaterialController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(StudyMaterial)
    private readonly studyMaterialRepository: Repository<StudyMaterial>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>
  ) {}

  @Get(":id")
  async getAllOfClass(@Param("id") id: number) {
    const classEntity = await this.classRepository.findOne({
      where: { id },
      relations: {
        studyMaterials: true,
      },
    });
    return {
      statusCode: 200,
      data: classEntity?.studyMaterials || [],
    };
  }

  @Get("/detail/:id")
  async getDetailMaterialClass(@Param("id") id: number) {
    const materialStudyEntity = await this.studyMaterialRepository.findOne({
      where: { id },
    });
    return {
      statusCode: 200,
      data: materialStudyEntity,
    };
  }

  @Post()
  async createStudyMaterial(@Param("id") idClass: number, @Body() body: any) {
    const classEntity = await this.classRepository.findOne({
      where: { id: idClass },
    });
    let newStudyMaterial = this.studyMaterialRepository.create({
      ...body,
      class: classEntity,
    });

    const studyMaterialCreated =
      await this.studyMaterialRepository.save(newStudyMaterial);

    return {
      statusCode: 200,
      data: studyMaterialCreated,
    };
  }

  @Post("update")
  async updateStudyMaterial(@Param("id") id: number, @Body() body: any) {
    const studyMaterial = await this.studyMaterialRepository.findOne({
      where: { id },
    });

    Object.assign(studyMaterial, body);

    const studyMaterialUpdated =
      await this.studyMaterialRepository.save(studyMaterial);

    return {
      statusCode: 200,
      data: studyMaterialUpdated,
    };
  }

  @Post("delete/:id")
  //delete by id study material
  async deleteStudyMaterial(@Param("id") id: number) {
    await this.studyMaterialRepository.delete({ id });
    return {
      statusCode: 200,
    };
  }
}
