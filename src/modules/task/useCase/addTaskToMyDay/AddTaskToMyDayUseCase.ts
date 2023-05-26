import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

import { AppError } from '@shared/infra/http/errors/AppError';

interface IRequest {
    taskId: string;
}

@injectable()
class AddTaskToMyDayUseCase {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) {}

    async execute({ taskId }: IRequest) {
        const task = await this.tasksRepository.findById(taskId);

        if (!task) {
            throw new AppError('Task not found');
        }

        if (task.my_day === true) {
            throw new AppError('Property my_day is already true');
        }

        task.my_day = true;

        await this.tasksRepository.addTaskToMyDay(task);
    }
}

export { AddTaskToMyDayUseCase };
