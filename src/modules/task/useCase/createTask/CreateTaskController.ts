import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateTaskUseCase, IRequest } from './CreateTaskUseCase';
import { CreateTaskSchema } from './CreateTaskValidation';

class CreateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, description }: IRequest = request.body;
            const user_id = request.user.id;

            CreateTaskSchema.parse(request.body);

            const createTaskUserCase = container.resolve(CreateTaskUseCase);

            const task = await createTaskUserCase.execute({ name, description, user_id });

            return response.status(201).json(task);
        } catch (err) {
            return response.status(500).json({ error: 'It was not possible to create a new task' + err.message });
        }
    }
}

export { CreateTaskController };
