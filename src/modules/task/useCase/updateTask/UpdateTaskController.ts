import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

class UpdateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { id } = request.params;
        const { name, description } = request.body;

        const updateTaskUseCase = container.resolve(UpdateTaskUseCase);

        const task = await updateTaskUseCase.execute({
            id,
            name,
            description,
            user_id,
        });

        return response.json(task);
    }
}

export { UpdateTaskController };
