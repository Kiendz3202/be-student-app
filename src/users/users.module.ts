import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { Teacher } from "./entities/teacher.entity";
import { Student } from "./entities/student.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Teacher, Student])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
