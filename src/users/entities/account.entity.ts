import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

export enum UserRole {
  TEACHER = 'giảng viên',
  STUDENT = 'sinh viên',
}

export enum AccountStatus {
  ACTIVE = 'kích hoạt',
  BLOCKED = 'bị khóa',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column({ unique: true })
  // email: string;

  // @Column()
  // password: string;

  // @Column({ enum: UserRole })
  // role: UserRole;

  // @Column()
  // token: string;

  // @Column()
  // session: string;

  // @Column({ enum: AccountStatus })
  // status: AccountStatus;

  // @OneToMany(() => Teacher, teacher => teacher.user)
  // teachers: Teacher[];

  // @OneToMany(() => Student, student => student.user)
  // students: Student[];
}