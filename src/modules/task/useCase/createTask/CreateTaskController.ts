import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateTaskUseCase, IRequest } from './CreateTaskUseCase';

class CreateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, description }: IRequest = request.body;

        const createTaskUserCase = container.resolve(CreateTaskUseCase);

        createTaskUserCase.execute({ user_id: id, name, description });

        return response.status(201).json({
            name,
            description,
            user_id: id,
        });
    }
}

export { CreateTaskController };
