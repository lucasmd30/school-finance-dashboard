import { DataSource } from 'typeorm';
import { Student } from 'src/students/student.entity';
import { Payment } from 'src/payments/payment.entity';
import { Expense } from 'src/expenses/expense.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Student, Payment, Expense],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const studentRepo = AppDataSource.getRepository(Student);
  const paymentRepo = AppDataSource.getRepository(Payment);
  const expenseRepo = AppDataSource.getRepository(Expense);

  const students = await studentRepo.save([
    { name: 'João' },
    { name: 'Maria' },
    { name: 'Pedro' },
    { name: 'Ana' },
    { name: 'Lucas' },
  ]);

  await paymentRepo.save([
    {
      student: students[0],
      amount: 500,
      due_date: '2025-11-05',
      paid_date: '2025-11-05',
      status: 'paid',
    },
    {
      student: students[1],
      amount: 500,
      due_date: '2025-11-05',
      paid_date: null,
      status: 'pending',
    },
    {
      student: students[2],
      amount: 500,
      due_date: '2025-11-05',
      paid_date: '2025-11-07',
      status: 'late',
    },
  ]);

  await expenseRepo.save([
    { description: 'Compra de material', amount: 200, date: '2025-11-01' },
    { description: 'Salários', amount: 1500, date: '2025-11-02' },
  ]);

  console.log('Seed finalizado!');
  process.exit();
}

seed();
