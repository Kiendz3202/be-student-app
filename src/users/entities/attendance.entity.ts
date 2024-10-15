import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Class } from "./class.entity";
import { Student } from "./student.entity";
import { BaseEntity } from "./base.entity";

export enum AttendanceStatus {
  // PRESENT = 'có mặt',
  // ABSENT_WITH_EXCUSE = 'vắng mặt có phép',
  // ABSENT_WITHOUT_EXCUSE = 'vắng mặt không phép',
  PRESENT = "PRESENT",
  ABSENT_WITH_EXCUSE = "ABSENT_WITH_EXCUSE",
  ABSENT_WITHOUT_EXCUSE = "ABSENT_WITHOUT_EXCUSE",
}

@Entity()
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.attendances)
  class: Class;

  @ManyToOne(() => Student, (student) => student.attendances)
  student: Student;

  @Column({
    type: "enum",
    enum: AttendanceStatus,
    default: AttendanceStatus.ABSENT_WITHOUT_EXCUSE,
  })
  status: AttendanceStatus;

  @Column()
  timestamp: number;
}
