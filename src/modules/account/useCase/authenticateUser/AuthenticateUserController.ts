import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { z } from 'zod';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

import { IRequest } from './AuthenticateUserUseCase';
import { AuthenticateUserSchema } from './AuthenticateUserValidation';

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password }: IRequest = request.body;

            const transformedData = AuthenticateUserSchema.parse({ email, password });

            const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

            const user = await authenticateUserUseCase.execute({
                email: transformedData.email,
                password: transformedData.password,
            });

            return response.json({
                user: {
                    id: user.user.id,
                    name: user.user.name,
                    email: user.user.email,
                },
                token: user.token,
                refresh_token: user.refresh_token,
            });
        } catch (err) {
            if (z.instanceof(err)) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return response.status(400).json({ errors: errorMessages });
            }

            return response.status(400).json({ message: err });
        }
    }
}

export { AuthenticateUserController };
