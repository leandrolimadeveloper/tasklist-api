import * as dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { User } from '@modules/account/infra/typeorm/entities/User';
import { Task } from '@modules/task/infra/typeorm/entities/Task';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Task],

    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});
