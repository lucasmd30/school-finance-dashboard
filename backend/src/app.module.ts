import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // <- necessário

import { Student } from './students/student.entity';
import { Payment } from './payments/payment.entity';
import { Expense } from './expenses/expense.entity';

import { StudentsModule } from './students/student.module';
import { PaymentsModule } from './payments/payment.module';
import { ExpensesModule } from './expenses/expense.module';
import { IndicatorsModule } from 'src/indicators/indicators.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [Student, Payment, Expense],
    }),

    StudentsModule,
    PaymentsModule,
    ExpensesModule,
    IndicatorsModule,
  ],
})
export class AppModule {}
