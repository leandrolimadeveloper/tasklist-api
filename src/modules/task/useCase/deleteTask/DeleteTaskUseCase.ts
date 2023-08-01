import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

import { AppError } from '@shared/infra/http/errors/AppError';

@injectable()
class DeleteTaskUseCase {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) {}

    async execute(taskId: string): Promise<void> {
        const task = await this.tasksRepository.findById(taskId);

        if (!task) {
            throw new AppError('Task not found');
        }

        await this.tasksRepository.delete(task);
    }
}

export { DeleteTaskUseCase };
