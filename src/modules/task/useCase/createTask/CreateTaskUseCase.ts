import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

export interface IRequest {
    id?: string;
    name: string;
    description: string;
    done?: boolean;
    user_id: string;
}

@injectable()
class CreateTaskUseCase {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) {}

    async execute({ id, name, description, done, user_id }: IRequest) {
        await this.tasksRepository.create({ id, name, description, done, user_id });
    }
}

export { CreateTaskUseCase };
