import { TasksRepositoryInMemory } from '@modules/task/repositores/in-memory/TasksRepositoryInMemory';
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase';
import { AddTaskToMyDayUseCase } from './AddTaskToMyDayUseCase';

import { ICreateTaskDTO } from '@modules/task/dtos/ICreateTaskDTO';

import { AppError } from '@shared/infra/http/errors/AppError';

let tasksRepositoryInMemory: TasksRepositoryInMemory;
let createTaskUseCase: CreateTaskUseCase;
let addTaskToMyDayUseCase: AddTaskToMyDayUseCase;

describe('Add task to My Day feature', () => {
    beforeEach(() => {
        tasksRepositoryInMemory = new TasksRepositoryInMemory();
        createTaskUseCase = new CreateTaskUseCase(tasksRepositoryInMemory);
        addTaskToMyDayUseCase = new AddTaskToMyDayUseCase(tasksRepositoryInMemory);
    });

    it('should be able to update the field my_day from false to true', async () => {
        const task: ICreateTaskDTO = {
            id: '123',
            name: 'Task name',
            description: 'Task description',
            done: false,
            my_day: false,
            user_id: '123abc',
        };

        await createTaskUseCase.execute(task);

        const taskCreated = await tasksRepositoryInMemory.findById(task.id);

        await addTaskToMyDayUseCase.execute({
            taskId: taskCreated.id,
        });

        expect(taskCreated).toBeDefined();
        expect(taskCreated.my_day).toBe(true);
    });

    it('should not be able to update the field my_day to true if it is already true', async () => {
        expect(async () => {
            const task: ICreateTaskDTO = {
                id: '123',
                name: 'Task name',
                description: 'Task description',
                done: false,
                my_day: true,
                user_id: '123abc',
            };

            await createTaskUseCase.execute(task);

            const taskCreated = await tasksRepositoryInMemory.findById(task.id);

            await addTaskToMyDayUseCase.execute({
                taskId: taskCreated.id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
