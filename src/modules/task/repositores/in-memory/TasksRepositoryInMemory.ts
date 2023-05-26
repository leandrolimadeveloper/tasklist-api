import { ICreateTaskDTO } from '@modules/task/dtos/ICreateTaskDTO';
import { Task } from '@modules/task/infra/typeorm/entities/Task';
import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

class TasksRepositoryInMemory implements ITasksRepository {
    tasks: Task[] = [];

    async create({ id, name, description, done, my_day, user_id }: ICreateTaskDTO): Promise<void> {
        const task = new Task();

        Object.assign(task, {
            id,
            name,
            description,
            done,
            my_day,
            user_id,
        });

        this.tasks.push(task);
    }

    async findByName(name: string): Promise<Task> {
        const task = this.tasks.find((task) => task.name === name);

        return task;
    }

    async findById(id: string): Promise<Task> {
        const task = this.tasks.find((task) => task.id === id);

        return task;
    }

    async turnTaskDone(task: Task): Promise<Task> {
        return task;
    }

    async addTaskToMyDay(task: Task): Promise<Task> {
        return task;
    }
}

export { TasksRepositoryInMemory };
