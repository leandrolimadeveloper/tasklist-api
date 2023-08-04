import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO';
import { Task } from '../infra/typeorm/entities/Task';

interface ITasksRepository {
    create({ name, description, user_id }: ICreateTaskDTO): Promise<Task | undefined>;
    findByUserId(user_id: string): Promise<Task[] | undefined>;
    delete(task: Task): Promise<void>;
    findById(id: string): Promise<Task | undefined>;
    findByName(name: string): Promise<Task | undefined>;
    turnTaskDone(task: Task): Promise<Task | undefined>;
    addTaskToMyDay(task: Task): Promise<Task | undefined>;
}

export { ITasksRepository };
