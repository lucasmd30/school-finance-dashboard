import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from '../payments/payment.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Payment, (payment) => payment.student)
  payments: Payment[];
}
