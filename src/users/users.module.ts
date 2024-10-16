import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { Teacher } from "./entities/teacher.entity";
import { Student } from "./entities/student.entity";
import { ClassController } from "./controllers/class.controller";
import { Class } from "./entities/class.entity";
import { StudyMaterial } from "./entities/study-material.entity";
import { StudyMaterialController } from "./controllers/study-material.controller";
import { Assignment } from "./entities/assignment.entity";
import { SubmittedAssignment } from "./entities/submitted-assignment.entity";
import { AssignmentController } from "./controllers/assignment.controller";
import { SubmittedAssignmentController } from "./controllers/submitted-assignment.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Teacher,
      Student,
      Class,
      StudyMaterial,
      Assignment,
      SubmittedAssignment,
    ]),
  ],
  providers: [UsersService],
  controllers: [
    UsersController,
    ClassController,
    StudyMaterialController,
    AssignmentController,
    SubmittedAssignmentController,
  ],
})
export class UsersModule {}
