import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';
import { AppError } from '@shared/infra/http/errors/AppError';

class DeleteTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);

        try {
            await deleteTaskUseCase.execute(id);
            return response.status(204).end();
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
            }

            return response.status(500).json({ error: 'Internal server error' });
        }
    }
}

export { DeleteTaskController };
