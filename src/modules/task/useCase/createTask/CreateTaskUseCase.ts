import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

export interface IRequest {
    id?: string;
    name: string;
    description: string;
    done?: boolean;
    my_day?: boolean;
    user_id: string;
}

@injectable()
class CreateTaskUseCase {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) {}

    async execute({ id, name, description, done, my_day, user_id }: IRequest) {
        await this.tasksRepository.create({ id, name, description, done, my_day, user_id });
    }
}

export { CreateTaskUseCase };
