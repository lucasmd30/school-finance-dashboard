import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../payments/payment.entity';
import { Expense } from '../expenses/expense.entity';
import { Student } from '../students/student.entity';

function parseDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectRepository(Payment) private paymentsRepo: Repository<Payment>,
    @InjectRepository(Expense) private expensesRepo: Repository<Expense>,
    @InjectRepository(Student) private studentsRepo: Repository<Student>,
  ) {}

  async getIndicators() {
    const now = new Date(2025, 10, 20);

    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const payments = await this.paymentsRepo.find();
    const students = await this.studentsRepo.find();
    const expenses = await this.expensesRepo.find();

    const paymentsThisMonth = payments.filter((p) => {
      const due = parseDate(p.due_date);
      return due.getMonth() + 1 === month && due.getFullYear() === year;
    });

    const totalRevenue = paymentsThisMonth
      .filter((p) => p.status === 'paid')
      .reduce((acc, p) => acc + Number(p.amount), 0);

    const totalPending = paymentsThisMonth
      .filter((p) => p.status !== 'paid')
      .reduce((acc, p) => acc + Number(p.amount), 0);

    const delinquent = paymentsThisMonth.filter(
      (p) => p.status === 'late',
    ).length;

    const inadimplencyRate =
      students.length > 0 ? delinquent / students.length : 0;

    const avgRevenuePerStudent =
      students.length > 0 ? totalRevenue / students.length : 0;

    const avgDelayDaysArray = payments
      .filter((p) => p.status === 'late')
      .map((p) => {
        const due = parseDate(p.due_date);

        if (p.paid_date) {
          const paid = parseDate(p.paid_date);
          return (paid.getTime() - due.getTime()) / (1000 * 60 * 60 * 24);
        }

        return (now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24);
      });

    const avgDelayDays =
      avgDelayDaysArray.length > 0
        ? avgDelayDaysArray.reduce((a, b) => a + b, 0) /
          avgDelayDaysArray.length
        : 0;

    const totalExpenses = expenses.reduce(
      (acc, e) => acc + Number(e.amount),
      0,
    );

    return {
      totalRevenue: totalRevenue,
      totalPending: totalPending,
      inadimplencyRate: inadimplencyRate,
      avgRevenuePerStudent: avgRevenuePerStudent,
      avgDelayDays: avgDelayDays,
      totalExpenses: totalExpenses,
    };
  }
}
