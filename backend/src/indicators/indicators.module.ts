import { Module } from '@nestjs/common';
import { IndicatorsService } from './indicators.service';
import { IndicatorsController } from './indicators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/payments/payment.entity';
import { Student } from 'src/students/student.entity';
import { Expense } from 'src/expenses/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Student, Expense])],
  controllers: [IndicatorsController],
  providers: [IndicatorsService],
})
export class IndicatorsModule {}
