import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Class } from "./class.entity";
import { Assignment } from "./assignment.entity";

//cần tạo user trước rồi mới tạo teacher or student
@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.teacher)
  @JoinColumn()
  user: User;

  @OneToMany(() => Class, (classEntity) => classEntity.teacher)
  classes: Class[];
}
