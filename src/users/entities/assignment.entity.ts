import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Class } from './class.entity';
import { Student } from './student.entity';
import { SubmittedAssignment } from './submitted-assignment.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Class, classEntity => classEntity.assignments)
  class: Class;

  @OneToMany(() => SubmittedAssignment, submittedAssignment => submittedAssignment.assignment)
  submittedAssignments: SubmittedAssignment[];

  @Column()
  dueDate: number;
}