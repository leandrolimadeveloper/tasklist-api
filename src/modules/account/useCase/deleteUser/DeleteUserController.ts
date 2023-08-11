import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const deleteUserUseCase = container.resolve(DeleteUserUseCase);

        await deleteUserUseCase.execute(user_id);

        return response.status(204).end();
    }
}

export { DeleteUserController };
