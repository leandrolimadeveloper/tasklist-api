import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTasksByUserIdUseCase } from './ListTasksByUserIdUseCase';

class ListTasksByUserIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const listTasksByUserIdUseCase = container.resolve(ListTasksByUserIdUseCase);

        const tasks = await listTasksByUserIdUseCase.execute(user_id);

        return response.json(tasks);
    }
}

export { ListTasksByUserIdController };
