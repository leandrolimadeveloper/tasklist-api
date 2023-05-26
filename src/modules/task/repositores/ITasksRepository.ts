import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO';
import { Task } from '../infra/typeorm/entities/Task';

interface ITasksRepository {
    create({ name, description, done, user_id }: ICreateTaskDTO): Promise<void>;
    findById(id: string): Promise<Task | undefined>;
    findByName(name: string): Promise<Task | undefined>;
    turnTaskDone(task: Task): Promise<Task | undefined>;
    addTaskToMyDay(task: Task): Promise<Task | undefined>;
}

export { ITasksRepository };
