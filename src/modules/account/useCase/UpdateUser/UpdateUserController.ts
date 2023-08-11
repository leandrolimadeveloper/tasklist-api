import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, password, newPassword } = request.body;

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const user = await updateUserUseCase.execute({
            id: user_id,
            name,
            email,
            password,
            newPassword,
        });

        return response.json({
            user_id: user.id,
            name: user.name,
            email: user.email,
        });
    }
}

export { UpdateUserController };
