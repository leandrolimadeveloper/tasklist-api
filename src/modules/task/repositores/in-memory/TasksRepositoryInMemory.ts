import { ICreateTaskDTO } from '@modules/task/dtos/ICreateTaskDTO';
import { Task } from '@modules/task/infra/typeorm/entities/Task';
import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';

class TasksRepositoryInMemory implements ITasksRepository {
    tasks: Task[] = [];

    async create({ id, name, description, done, my_day, user_id }: ICreateTaskDTO): Promise<Task | undefined> {
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

        return task;
    }

    async findByName(name: string): Promise<Task> {
        const task = this.tasks.find((task) => task.name === name);

        return task;
    }

    async findById(id: string): Promise<Task> {
        const task = this.tasks.find((task) => task.id === id);

        return task;
    }

    async findByUserId(user_id: string): Promise<Task[]> {
        const tasks = this.tasks.filter((task) => task.user_id === user_id);

        return tasks;
    }

    async turnTaskDone(task: Task): Promise<Task> {
        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

        this.tasks[taskIndex].done = true;

        return this.tasks[taskIndex];
    }

    async addTaskToMyDay(task: Task): Promise<Task> {
        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

        this.tasks[taskIndex].my_day = true;

        return this.tasks[taskIndex];
    }

    async delete(task: Task): Promise<void> {
        const taskIndex = this.tasks.indexOf(task);

        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
        }
    }
}

export { TasksRepositoryInMemory };
