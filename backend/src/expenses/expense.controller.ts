import { Controller, Post, Body, Get } from '@nestjs/common';
import { ExpensesService } from './expense.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private service: ExpensesService) {}

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
