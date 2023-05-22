import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateTaskUseCase } from './CreateTaskUseCase';

class CreateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name } = request.body;

        const createTaskUserCase = container.resolve(CreateTaskUseCase);

        await createTaskUserCase.execute({ user_id: id, name });

        return response.status(201).json({
            user_id: id,
            name,
        });
    }
}

export { CreateTaskController };
