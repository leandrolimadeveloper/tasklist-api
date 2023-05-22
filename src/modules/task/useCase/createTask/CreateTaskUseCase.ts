import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

interface IRequest {
    name: string;
    user_id: string;
}

@injectable()
class CreateTaskUseCase {
    constructor(
        @inject('TasksRepository')
        private tasksRepository: ITasksRepository
    ) {}

    async execute({ name, user_id }: IRequest) {
        await this.tasksRepository.create({ name, user_id });
    }
}

export { CreateTaskUseCase };
