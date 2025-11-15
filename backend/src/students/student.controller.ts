import { Controller, Post, Body, Get } from '@nestjs/common';
import { StudentsService } from './student.service';

@Controller('students')
export class StudentsController {
  constructor(private service: StudentsService) {}

  @Post()
  create(@Body() body: { name: string }) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
