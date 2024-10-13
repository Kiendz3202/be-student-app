import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Class } from './class.entity';

export enum MaterialType {
  // LECTURE = 'bài giảng',
  // ADDITIONAL_READING = 'bài đọc thêm',
  // VIDEO = 'video hướng dẫn',
  LECTURE = 'LECTURE',
  ADDITIONAL_READING = 'ADDITIONAL_READING',
  VIDEO = 'VIDEO',
}

@Entity()
export class StudyMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, classEntity => classEntity.studyMaterials)
  class: Class;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column({type: 'enum', enum: MaterialType, default: MaterialType.LECTURE })
  type: MaterialType;
}
