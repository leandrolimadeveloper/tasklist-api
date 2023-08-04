import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';
import { Task } from '@modules/task/infra/typeorm/entities/Task';
import { AppError } from '@shared/infra/http/errors/AppError';

@injectable()
class ListTasksByUserIdUseCase {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) {}

    async execute(user_id: string): Promise<Task[]> {
        const tasks = await this.tasksRepository.findByUserId(user_id);

        if (!tasks) {
            throw new AppError('Tasks not found');
        }

        return tasks;
    }
}

export { ListTasksByUserIdUseCase };
