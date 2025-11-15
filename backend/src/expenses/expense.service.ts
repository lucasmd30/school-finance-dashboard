import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';

@Injectable()
export class ExpensesService {
  constructor(@InjectRepository(Expense) private repo: Repository<Expense>) {}

  create(data: { description: string; amount: number; date: string }) {
    const expense = this.repo.create(data);
    return this.repo.save(expense);
  }

  findAll() {
    return this.repo.find();
  }
}
