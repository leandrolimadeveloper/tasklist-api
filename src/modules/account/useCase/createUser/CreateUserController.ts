import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { CreateUserUseCase } from './CreateUserUseCase';

import { User } from './CreateUserValidation';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password } = request.body;

            const transformedData = User.parse({ name, email, password });

            const createUserUseCase = container.resolve(CreateUserUseCase);

            await createUserUseCase.execute({
                name: transformedData.name,
                email: transformedData.email,
                password: transformedData.password,
            });

            return response.status(201).end();
        } catch (err) {
            if (z.instanceof(err)) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return response.status(400).json({ errors: errorMessages });
            }

            return response.status(400).json({ message: err });
        }
    }
}

export { CreateUserController };
