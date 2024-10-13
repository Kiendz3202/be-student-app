import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';
import { Assignment } from './assignment.entity';
import { Attendance } from './attendance.entity';
import { StudyMaterial } from './study-material.entity';
import { LeaveRequest } from './leave-request.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Teacher, teacher => teacher.classes)
  teacher: Teacher;

  @OneToMany(() => Student, student => student.classes)
  students: Student[];
  
  @OneToMany(() => Assignment, assignment => assignment.class)
  assignments: Assignment[];
  
  @OneToMany(() => StudyMaterial, material => material.class)
  studyMaterials: StudyMaterial[];

  @OneToMany(() => Attendance, attendance => attendance.class)
  attendances: Attendance[];

  @OneToMany(() => LeaveRequest, leaveRequestEntity => leaveRequestEntity.class)
  leaveRequests: Class[];
}
