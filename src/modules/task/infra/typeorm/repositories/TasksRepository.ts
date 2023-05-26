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

    async create({ name, description, user_id, done, my_day }: ICreateTaskDTO): Promise<void> {
        const task = this.repository.create({
            name,
            description,
            done,
            my_day,
            user_id,
        });

        await this.repository.save(task);
    }

    async findById(id: string): Promise<Task | undefined> {
        const task = await this.repository.findOne({
            where: {
                id,
            },
        });

        return task;
    }

    async findByName(name: string): Promise<Task> {
        const task = this.repository.findOne({
            where: {
                name,
            },
        });

        return task;
    }

    async turnTaskDone(task: Task): Promise<Task | undefined> {
        const taskToBeUpdated = await this.repository.save(task);

        return taskToBeUpdated;
    }

    async addTaskToMyDay(task: Task): Promise<Task> {
        const taskToBeAddedToMyDay = await this.repository.save(task);

        return taskToBeAddedToMyDay;
    }
}

export { TasksRepository };
