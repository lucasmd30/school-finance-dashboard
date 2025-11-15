import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Student } from '../students/student.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private repo: Repository<Payment>,
    @InjectRepository(Student) private studentsRepo: Repository<Student>,
  ) {}

  async create(data: {
    studentId: number;
    amount: number;
    due_date: string;
    paid_date?: string | null;
    status?: string;
  }) {
    const student = await this.studentsRepo.findOneBy({ id: data.studentId });

    if (!student) {
      throw new Error(`Student with ID ${data.studentId} not found`);
    }

    const payment = this.repo.create({
      amount: data.amount,
      due_date: data.due_date,
      paid_date: data.paid_date ?? null,
      status: data.status ?? 'pending',
      student: student,
    });

    return this.repo.save(payment);
  }

  findAll() {
    return this.repo.find();
  }
}
