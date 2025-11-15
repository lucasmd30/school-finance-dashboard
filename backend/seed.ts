import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from './src/students/student.entity';
import { Payment } from './src/payments/payment.entity';
import { Expense } from './src/expenses/expense.entity';
import { configDotenv } from 'dotenv';
configDotenv();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Student, Payment, Expense],
  synchronize: true,
});

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDateThisMonth() {
  const now = new Date();
  const day = randomInt(1, 28);
  return new Date(now.getFullYear(), now.getMonth(), day);
}

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const studentRepo = AppDataSource.getRepository(Student);
    const paymentRepo = AppDataSource.getRepository(Payment);
    const expenseRepo = AppDataSource.getRepository(Expense);

    // await paymentRepo.clear();
    // await expenseRepo.clear();
    // await studentRepo.clear();

    const students: Student[] = [];
    for (let i = 1; i <= 80; i++) {
      const student = new Student();
      student.name = `Aluno ${i}`;
      students.push(student);
    }
    await studentRepo.save(students);
    console.log('80 alunos criados');

    const payments: Payment[] = [];
    for (const student of students) {
      const numPayments = 1;
      for (let i = 0; i < numPayments; i++) {
        const dueDate = randomDateThisMonth();
        const paidChance = Math.random();
        const status =
          paidChance > 0.2 ? 'paid' : paidChance > 0.1 ? 'late' : 'pending';
        const paidDate =
          status === 'paid'
            ? new Date(
                dueDate.getTime() + randomInt(0, 5) * 24 * 60 * 60 * 1000,
              )
            : null;

        const payment = new Payment();
        payment.student = student;
        payment.amount = randomInt(100, 500);
        payment.due_date = dueDate.toISOString().split('T')[0];
        payment.paid_date = paidDate
          ? paidDate.toISOString().split('T')[0]
          : null;
        payment.status = status;

        payments.push(payment);
      }
    }
    await paymentRepo.save(payments);
    console.log(`${payments.length} pagamentos criados`);

    const expenses: Expense[] = [];
    for (let i = 1; i <= 30; i++) {
      const expense = new Expense();
      expense.description = `Despesa ${i}`;
      expense.amount = randomInt(50, 1000);
      const date = randomDateThisMonth();
      expense.date = date.toISOString().split('T')[0];
      expenses.push(expense);
    }
    await expenseRepo.save(expenses);
    console.log(`${expenses.length} despesas criadas`);

    console.log('Seed completa finalizada!');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Erro ao rodar seed:', error);
  }
}

seed();
