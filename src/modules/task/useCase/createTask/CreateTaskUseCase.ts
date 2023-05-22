import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

export interface IRequest {
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

    async execute({ name, description, user_id }: IRequest) {
        await this.tasksRepository.create({ name, description, user_id });
    }
}

export { CreateTaskUseCase };
