import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToOne,
} from "typeorm";
import { Teacher } from "./teacher.entity";
import { Class } from "./class.entity";
import { Student } from "./student.entity";
import { Assignment } from "./assignment.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class SubmittedAssignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assignment, (assignment) => assignment.submittedAssignments)
  assignment: Assignment;

  @ManyToOne(() => Student, (student) => student.submittedAssignments)
  student: Student;

  @Column({ default: "" })
  linkSubmittedAssignment: string;

  @Column({ default: 0 })
  score: number;
}
