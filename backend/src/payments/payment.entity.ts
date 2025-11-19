import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../students/student.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.payments, { eager: true })
  student: Student;

  @Column('numeric')
  amount: number;

  @Column('date')
  due_date: string;

  @Column({ type: 'date', nullable: true })
  paid_date: string | null;

  @Column({ default: 'pending' })
  status: string;
}
