import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';

import { User } from '@modules/account/infra/typeorm/entities/User';
import { UserToken } from '@modules/account/infra/typeorm/entities/UserToken';
import { Task } from '@modules/task/infra/typeorm/entities/Task';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, UserToken, Task],

    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});
