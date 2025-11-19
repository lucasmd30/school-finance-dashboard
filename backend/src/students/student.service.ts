import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private repo: Repository<Student>) {}

  create(data: { name: string }) {
    const student = this.repo.create(data);
    return this.repo.save(student);
  }

  findAll() {
    return this.repo.find();
  }
}
