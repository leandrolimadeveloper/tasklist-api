import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { MarkTaskAsDoneUseCase } from './MarkTaskAsDoneUseCase';

import { AppError } from '@shared/infra/http/errors/AppError';

class MarkTaskAsDoneController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const markTaskAsDoneUseCase = container.resolve(MarkTaskAsDoneUseCase);

        try {
            await markTaskAsDoneUseCase.execute({
                taskId: id,
            });

            return response.status(200).end();
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
            }

            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export { MarkTaskAsDoneController };
