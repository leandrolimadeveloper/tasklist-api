import { TasksRepositoryInMemory } from '@modules/task/repositores/in-memory/TasksRepositoryInMemory';
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase';
import { MarkTaskAsDoneUseCase } from './MarkTaskAsDoneUseCase';

import { ICreateTaskDTO } from '@modules/task/dtos/ICreateTaskDTO';

let tasksRepositoryInMemory: TasksRepositoryInMemory;
let createTaskUseCase: CreateTaskUseCase;
let markTaskAsDoneUseCase: MarkTaskAsDoneUseCase;

describe('Mark a stask as done', () => {
    beforeEach(() => {
        tasksRepositoryInMemory = new TasksRepositoryInMemory();
        createTaskUseCase = new CreateTaskUseCase(tasksRepositoryInMemory);
        markTaskAsDoneUseCase = new MarkTaskAsDoneUseCase(tasksRepositoryInMemory);
    });

    it('should be able to update the field done for true if its value to be equal false', async () => {
        const task: ICreateTaskDTO = {
            id: '12345',
            name: 'Task name',
            description: 'Task description',
            done: false,
            user_id: '123abc',
        };

        await createTaskUseCase.execute({
            id: task.id,
            name: task.name,
            description: task.description,
            done: task.done,
            user_id: task.user_id,
        });

        const taskCreated = await tasksRepositoryInMemory.findById(task.id);

        await markTaskAsDoneUseCase.execute({
            taskId: taskCreated.id,
        });

        expect(taskCreated).toBeDefined();
        expect(taskCreated.done).toBe(true);
    });

    it('should not be able to update the field done for true if its value is already true', async () => {
        const task: ICreateTaskDTO = {
            id: '12345',
            name: 'Task name',
            description: 'Description name',
            done: true,
            user_id: '123abc',
        };

        await createTaskUseCase.execute({
            id: task.id,
            name: task.name,
            description: task.description,
            done: task.done,
            user_id: task.user_id,
        });

        const taskCreated = await tasksRepositoryInMemory.findById(task.id);

        await markTaskAsDoneUseCase.execute({
            taskId: taskCreated.id,
        });
    });
});
