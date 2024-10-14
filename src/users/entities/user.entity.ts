import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";
import { BaseEntity } from "./base.entity";

export enum UserRole {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.UNACTIVE })
  status: UserStatus;

  @OneToOne(() => Teacher, (teacher) => teacher.user)
  // @JoinColumn()
  teacher: Teacher;

  @OneToOne(() => Student, (student) => student.user)
  // @JoinColumn()
  student: Student;
}
