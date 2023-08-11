import { TasksRepositoryInMemory } from '@modules/task/repositores/in-memory/TasksRepositoryInMemory';
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

import { AppError } from '@shared/infra/http/errors/AppError';

let tasksRepositoryInMemory: TasksRepositoryInMemory;
let createTaskUseCase: CreateTaskUseCase;
let updateTaskUseCase: UpdateTaskUseCase;

describe('Update a task', () => {
    beforeEach(() => {
        tasksRepositoryInMemory = new TasksRepositoryInMemory();
        createTaskUseCase = new CreateTaskUseCase(tasksRepositoryInMemory);
        updateTaskUseCase = new UpdateTaskUseCase(tasksRepositoryInMemory);
    });

    it('should be able to update a task', async () => {
        const task = {
            id: '123',
            name: 'Task name',
            description: 'Task description',
            user_id: '123abc',
        };

        await createTaskUseCase.execute(task);

        const taskFound = await tasksRepositoryInMemory.findById(task.id);

        const taskUpdated = await updateTaskUseCase.execute({
            id: taskFound.id,
            name: 'Task name changed',
            description: taskFound.description,
            user_id: taskFound.user_id,
        });

        expect(taskUpdated).toBeDefined();
        expect(taskUpdated.name).toBe('Task name changed');
    });

    it('should not be able to update a task if it not exists', async () => {
        const task = {
            id: '123',
            name: 'Task name',
            description: 'Task description',
            user_id: '123abc',
        };

        const taskCreated = await createTaskUseCase.execute(task);

        await expect(
            updateTaskUseCase.execute({
                id: 'taskId-that-not-exists',
                name: taskCreated.name,
                description: taskCreated.description,
                user_id: taskCreated.user_id,
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
