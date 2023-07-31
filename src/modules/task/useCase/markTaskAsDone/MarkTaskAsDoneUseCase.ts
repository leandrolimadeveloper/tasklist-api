import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

import { AppError } from '@shared/infra/http/errors/AppError';

interface IRequest {
    taskId: string;
}

@injectable()
class MarkTaskAsDoneUseCase {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) {}

    async execute({ taskId }: IRequest) {
        const task = await this.tasksRepository.findById(taskId);

        if (!task) {
            throw new AppError('Task not found');
        }

        // throw new AppError('Property done is already true');

        task.done = !task.done;

        await this.tasksRepository.turnTaskDone(task);
    }
}

export { MarkTaskAsDoneUseCase };
