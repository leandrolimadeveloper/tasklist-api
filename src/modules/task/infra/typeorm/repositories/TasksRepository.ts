import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/data-source';

import { ICreateTaskDTO } from '@modules/task/dtos/ICreateTaskDTO';
import { Task } from '../entities/Task';
import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

class TasksRepository implements ITasksRepository {
    private repository: Repository<Task>;

    constructor() {
        this.repository = AppDataSource.getRepository(Task);
    }

    async create({ name, description, user_id }: ICreateTaskDTO): Promise<void> {
        const task = this.repository.create({
            name,
            description,
            user_id,
        });

        await this.repository.save(task);
    }

    async findByName(name: string): Promise<Task> {
        const task = this.repository.findOne({
            where: {
                name,
            },
        });

        return task;
    }
}

export { TasksRepository };
