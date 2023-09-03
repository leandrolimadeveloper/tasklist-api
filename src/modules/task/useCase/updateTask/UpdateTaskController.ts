import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { UpdateTaskUseCase } from './UpdateTaskUseCase';

import { UpdateTaskSchema } from './UpdateTaskValidation';

class UpdateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const user_id = request.user.id;
            const { id } = request.params;
            const { name, description } = request.body;

            const transformedData = UpdateTaskSchema.parse({ name, description });

            const updateTaskUseCase = container.resolve(UpdateTaskUseCase);

            const task = await updateTaskUseCase.execute({
                id,
                name: transformedData.name,
                description: transformedData.description,
                user_id,
            });

            return response.json(task);
        } catch (err) {
            if (z.instanceof(err)) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return response.status(400).json({ errors: errorMessages });
            }

            return response.status(500).json({ error: 'It was not possible to update the task' + err.message });
        }
    }
}

export { UpdateTaskController };
