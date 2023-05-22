import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

import { IRequest } from './AuthenticateUserUseCase';

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password }: IRequest = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

        const user = await authenticateUserUseCase.execute({
            email,
            password,
        });

        return response.json({
            user: {
                id: user.user.id,
                name: user.user.name,
                email: user.user.email,
            },
            token: user.token,
        });
    }
}

export { AuthenticateUserController };
