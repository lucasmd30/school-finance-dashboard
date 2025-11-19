import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/student.entity';
import { Payment } from '../payments/payment.entity';
import { Expense } from '../expenses/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Student, Payment, Expense],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
