import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole, UserStatus } from "../entities/user.entity";
import { Teacher } from "../entities/teacher.entity";
import { Student } from "../entities/student.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {}

  async create(createUser: any): Promise<User> {
    const user = new User();
    (user.name = createUser.name),
      (user.email = createUser.email),
      (user.password = createUser.password),
      (user.role = UserRole.TEACHER),
      (user.status = UserStatus.ACTIVE);

    const userRes = await this.usersRepository.save(user);

    if (createUser.role === UserRole.TEACHER) {
      const teacher = new Teacher();
      teacher.user = userRes;
      await this.teacherRepository.save(teacher);
    }
    if (createUser.role === UserRole.STUDENT) {
      const student = new Student();
      student.user = userRes;
      await this.studentRepository.save(student);
    }

    return userRes;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        teacher: {
          user: true,
        },
        student: true,
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
