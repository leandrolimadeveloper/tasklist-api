import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './modules/account/infra/typeorm/entities/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'docker',
    password: 'todopass',
    database: 'todo',
    entities: [User],
    synchronize: true,

    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});
