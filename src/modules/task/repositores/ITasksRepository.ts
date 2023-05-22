import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO';
import { Task } from '../infra/typeorm/entities/Task';

interface ITasksRepository {
    create({ name, user_id }: ICreateTaskDTO): Promise<void>;
    findByName(name: string): Promise<Task | undefined>;
}

export { ITasksRepository };
