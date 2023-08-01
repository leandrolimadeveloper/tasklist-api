import { TasksRepositoryInMemory } from '@modules/task/repositores/in-memory/TasksRepositoryInMemory';
import { CreateTaskUseCase } from './CreateTaskUseCase';

let tasksRepositoryInMemory: TasksRepositoryInMemory;
let createTaskUseCase: CreateTaskUseCase;

describe('Create a new task', () => {
    beforeEach(() => {
        tasksRepositoryInMemory = new TasksRepositoryInMemory();
        createTaskUseCase = new CreateTaskUseCase(tasksRepositoryInMemory);
    });

    it('should be able to create a new task', async () => {
        const task = {
            name: 'Task name',
            description: 'Task description',
            user_id: '123',
        };

        await createTaskUseCase.execute({
            name: task.name,
            description: task.description,
            user_id: task.user_id,
        });

        const taskCreated = await tasksRepositoryInMemory.findByName(task.name);

        expect(taskCreated).toBeDefined();
        expect(taskCreated.name).toBe(task.name);
        expect(taskCreated.user_id).toBe(task.user_id);
    });
});
