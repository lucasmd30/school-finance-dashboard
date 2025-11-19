import { Module } from '@nestjs/common';
import { IndicatorsService } from './indicators.service';
import { IndicatorsController } from './indicators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payments/payment.entity';
import { Student } from '../students/student.entity';
import { Expense } from '../expenses/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Student, Expense])],
  controllers: [IndicatorsController],
  providers: [IndicatorsService],
})
export class IndicatorsModule {}
