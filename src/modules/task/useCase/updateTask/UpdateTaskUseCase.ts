import { inject, injectable } from 'tsyringe';

import { Task } from '@modules/task/infra/typeorm/entities/Task';
import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

import { AppError } from '@shared/infra/http/errors/AppError';

interface IRequest {
    id: string;
    name: string;
    description: string;
    user_id: string;
}

@injectable()
class UpdateTaskUseCase {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) {}

    async execute({ id, name, description, user_id }: IRequest): Promise<Task> {
        const task = await this.tasksRepository.findById(id);

        if (!task) {
            throw new AppError('Task not found');
        }

        task.name = name;
        task.description = description;

        await this.tasksRepository.updateTask(id, name, description, user_id);

        return task;
    }
}

export { UpdateTaskUseCase };
