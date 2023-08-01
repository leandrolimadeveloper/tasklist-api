import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';
import { AppError } from '@shared/infra/http/errors/AppError';
import { Task } from '@modules/task/infra/typeorm/entities/Task';

export interface IRequest {
    id?: string;
    name: string;
    description: string;
    user_id: string;
}

@injectable()
class CreateTaskUseCase {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) {}

    async execute({ id, name, description, user_id }: IRequest): Promise<Task | undefined> {
        try {
            const task = await this.tasksRepository.create({ id, name, description, user_id });

            return task;
        } catch (err) {
            throw new AppError('It was not possible to create a new task');
        }
    }
}

export { CreateTaskUseCase };
