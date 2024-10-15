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

@Controller("class")
export class ClassController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>
  ) {}

  @Get()
  async getAllClass() {
    const allClasses = await this.classRepository.find({
      relations: {
        teacher: {
          user: true,
        },
      },
    });
    return {
      statusCode: 200,
      data: allClasses,
    };
  }

  @Get(":id")
  // ví dụ http://localhost:3000/class/2
  async getDetailClass(@Param("id") id: number) {
    const allClasses = await this.classRepository.findOne({
      where: {
        id,
      },
      relations: {
        teacher: {
          user: true,
        },
      },
    });
    return {
      statusCode: 200,
      data: allClasses,
    };
  }

  @Post()
  //user teacher tạo, nhớ truyền email user teacher lên
  async createClass(@Body() createClassDto: any) {
    const {
      email,
      name,
      description,
      semester,
      maxStudents,
      startDate,
      endDate,
    } = createClassDto;

    const userTeacher = await this.usersRepository.findOne({
      where: {
        email,
      },
      relations: {
        teacher: true,
      },
    });

    const newClass = new Class();
    newClass.name = name;
    newClass.description = description;
    newClass.semester = semester;
    newClass.maxStudents = maxStudents;
    newClass.startDate = startDate;
    newClass.endDate = endDate;
    newClass.teacher = userTeacher.teacher;

    const classCreated = await this.classRepository.save(newClass);

    return {
      statuscode: 200,
      data: classCreated,
    };
  }

  @Post("update")
  //teacher update
  //id class và data các trường update
  async updateClass(@Param("id") id: number, @Body() body: any) {
    const classEntity = await this.classRepository.findOne({
      where: { id },
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    Object.assign(classEntity, body);

    const classUpdated = await this.classRepository.save(classEntity);
    return {
      statusCode: 200,
      data: classUpdated,
    };
  }

  @Post("student-register-class")
  //student đăng ký lớp
  //email student va id class
  async studentRegisterClass(@Body() body: any) {
    const { email, id } = body;
    const userStudent = await this.usersRepository.findOne({
      where: {
        email,
      },
      relations: {
        student: true,
      },
    });

    const classRes = await this.classRepository.findOne({
      where: { id },
      relations: {
        students: true,
      },
    });

    if (classRes.maxStudents === classRes.students.length)
      throw new Error("Maximum students in this class");
    classRes.students.push(userStudent.student);

    const classUpdate = await this.classRepository.save(classRes);

    return {
      statuscode: 200,
      data: classUpdate,
    };
  }

  @Post("student-unregister-class")
  // student hủy đăng ký lớp
  // email student và id class
  async studentUnregisterClass(@Body() body: any) {
    const { email, id } = body;

    // Tìm sinh viên dựa vào email
    const userStudent = await this.usersRepository.findOne({
      where: {
        email,
      },
      relations: {
        student: true,
      },
    });

    if (!userStudent || !userStudent.student) {
      throw new Error("Student not found");
    }

    // Tìm class dựa vào id
    const classRes = await this.classRepository.findOne({
      where: { id },
      relations: {
        students: true,
      },
    });

    if (!classRes) {
      throw new Error("Class not found");
    }

    // Loại bỏ student khỏi class
    classRes.students = classRes.students.filter(
      (student) => student.id !== userStudent.student.id
    );

    // Lưu lại class sau khi đã loại bỏ sinh viên
    const classUpdate = await this.classRepository.save(classRes);

    return {
      statuscode: 200,
      data: classUpdate,
    };
  }

  @Post("delete")
  //delete by id class
  async deleteClass(@Body() body: any) {
    await this.classRepository.delete({ id: body.id });
    return {
      statusCode: 200,
    };
  }
}
