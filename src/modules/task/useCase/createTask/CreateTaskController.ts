import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { z } from 'zod';

import { CreateTaskUseCase, IRequest } from './CreateTaskUseCase';

import { CreateTaskSchema } from './CreateTaskValidation';

class CreateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, description }: IRequest = request.body;
            const user_id = request.user.id;

            const transformedData = CreateTaskSchema.parse({ name, description });

            const createTaskUserCase = container.resolve(CreateTaskUseCase);

            const task = await createTaskUserCase.execute({
                name: transformedData.name,
                description: transformedData.description,
                user_id,
            });

            return response.status(201).json(task);
        } catch (err) {
            if (z.instanceof(err)) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return response.status(400).json({ errors: errorMessages });
            }

            return response.status(500).json({ error: 'It was not possible to create a new task' + err.message });
        }
    }
}

export { CreateTaskController };
