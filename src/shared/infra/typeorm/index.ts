import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../data-source';

export default async (host = 'database_todo'): Promise<DataSource> => {
    console.log('Database started');

    return AppDataSource.setOptions({ host }).initialize();
};
