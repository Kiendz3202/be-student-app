import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { UsersService } from "../services/users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Teacher } from "../entities/teacher.entity";
import { Student } from "../entities/student.entity";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {}

  @Get('/health')
  findAll(): Promise<User[]> {
    return 'user health';
  }

  @Post()
  create(@Body() createUser: any): Promise<User> {
    console.log(createUser);
    return this.usersService.create(createUser);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
