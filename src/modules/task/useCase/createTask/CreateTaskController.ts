import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateTaskUseCase, IRequest } from './CreateTaskUseCase';

class CreateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description, user_id }: IRequest = request.body;

        const createTaskUserCase = container.resolve(CreateTaskUseCase);

        createTaskUserCase.execute({ name, description, user_id });

        return response.status(201).json({
            name,
            description,
            user_id,
        });
    }
}

export { CreateTaskController };
