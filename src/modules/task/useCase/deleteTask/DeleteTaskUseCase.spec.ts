import { TasksRepositoryInMemory } from '@modules/task/repositores/in-memory/TasksRepositoryInMemory';
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

let tasksRepositoryInMemory: TasksRepositoryInMemory;
let createTaskUseCase: CreateTaskUseCase;
let deleteTaskUseCase: DeleteTaskUseCase;

describe('Delete a task', () => {
    beforeEach(() => {
        tasksRepositoryInMemory = new TasksRepositoryInMemory();
        createTaskUseCase = new CreateTaskUseCase(tasksRepositoryInMemory);
        deleteTaskUseCase = new DeleteTaskUseCase(tasksRepositoryInMemory);
    });

    it('should be able to delete a task', async () => {
        const task = {
            id: '123',
            name: 'Task name',
            description: 'Task description',
            user_id: '123abc',
        };

        const taskCreated = await createTaskUseCase.execute(task);

        await deleteTaskUseCase.execute(taskCreated.id);

        const taskDeleted = await tasksRepositoryInMemory.findById(taskCreated.id);

        expect(taskDeleted).toBeUndefined();
    });
});
