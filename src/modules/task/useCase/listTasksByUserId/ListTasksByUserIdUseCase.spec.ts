import { TasksRepositoryInMemory } from '@modules/task/repositores/in-memory/TasksRepositoryInMemory';
import { ListTasksByUserIdUseCase } from './ListTasksByUserIdUseCase';
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase';

let tasksRepositoryInMemory: TasksRepositoryInMemory;
let createTaskUseCase: CreateTaskUseCase;
let listTasksByUserIdUseCase: ListTasksByUserIdUseCase;

// eslint-disable-next-line quotes
describe("List user's tasks", () => {
    beforeEach(() => {
        tasksRepositoryInMemory = new TasksRepositoryInMemory();
        createTaskUseCase = new CreateTaskUseCase(tasksRepositoryInMemory);
        listTasksByUserIdUseCase = new ListTasksByUserIdUseCase(tasksRepositoryInMemory);
    });

    // eslint-disable-next-line quotes
    it("should be able to list all user's tasks", async () => {
        const task = {
            id: '123',
            name: 'Task name',
            description: 'Description task',
            user_id: '123abc',
        };

        const taskCreated = await createTaskUseCase.execute(task);

        const allTasks = await listTasksByUserIdUseCase.execute(taskCreated.user_id);

        expect(allTasks).toBeDefined();
        expect(Array.isArray(allTasks)).toBe(true);
        expect(allTasks).toHaveLength(1);
        expect(allTasks[0].id).toBe(taskCreated.id);
    });

    it('should return an empty array when user has no tasks', async () => {
        const userId = 'user_with_no_tasks';

        const allTasks = await listTasksByUserIdUseCase.execute(userId);

        expect(Array.isArray(allTasks)).toBe(true);
        expect(allTasks).toHaveLength(0);
    });
});
