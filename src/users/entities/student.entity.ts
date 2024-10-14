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
import { Attendance } from "./attendance.entity";
import { LeaveRequest } from "./leave-request.entity";
import { SubmittedAssignment } from "./submitted-assignment.entity";

//cần tạo user trước rồi mới tạo teacher or student
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => LeaveRequest,
    (leaveRequestEntity) => leaveRequestEntity.student
  )
  leaveRequests: LeaveRequest[];

  @ManyToMany(() => Class, (classEntity) => classEntity.students)
  classes: Class[];

  @OneToMany(
    () => SubmittedAssignment,
    (submittedAssignment) => submittedAssignment.student
  )
  submittedAssignments: SubmittedAssignment[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];
}
