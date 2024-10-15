import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./student.entity";
import { Class } from "./class.entity";
import { BaseEntity } from "./base.entity";

export enum LeaveRequestStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

@Entity()
export class LeaveRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.leaveRequests)
  student: Student;

  @ManyToOne(() => Class, (classEntity) => classEntity.leaveRequests)
  class: Class;

  @Column()
  reason: string;

  @Column({
    type: "enum",
    enum: LeaveRequestStatus,
    default: LeaveRequestStatus.REJECTED,
  })
  status: LeaveRequestStatus;

  @Column()
  requestTime: number;

  @Column({ nullable: true })
  responseTime: number;
}
